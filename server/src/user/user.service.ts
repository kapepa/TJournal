import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { config } from 'dotenv';
import { UserEntity } from './user.entity';
import {DtoAuth} from "../dto/dto.auth";
import {DtoUser} from "../dto/dto.user";
import {MailerService} from "../mailer/mailer.service";

config();

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private mailerService: MailerService,
  ) {}

  async createUser (body: DtoAuth): Promise<DtoUser> {
    const { password, ...other } = body;
    const checkEmail = await this.findUser('email', body.email);
    if(checkEmail) throw new BadRequestException({
      status: 203,
      error: 'Such email already exist'
    })

    const hash = await bcrypt.hashSync(password, Number(process.env.BCRYPT_ROUNDS));
    const user = await this.usersRepository.create({...other, password: hash});
    const profile = await this.usersRepository.save(user);
    await this.mailerService.SendEmailRegistration(profile.email);
    return profile;
  }

  async findUser (name: string, value: string){
    return await this.usersRepository.findOne({[name]: value});
  }

  async findOne(name: string): Promise<DtoUser | undefined> {
    const user = await this.usersRepository.findOne({name});
    return user;
  }
}
