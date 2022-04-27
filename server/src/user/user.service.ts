import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { config } from 'dotenv';
import { UserEntity } from './user.entity';
import { DtoAuth } from '../dto/dto.auth';
import { DtoUser } from '../dto/dto.user';
import { MailerService } from '../mailer/mailer.service';
import { SettingsService } from '../settings/settings.service';
import { SubscribeService } from '../subscribe/subscribe.service';

config();

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private mailerService: MailerService,
    private settingsService: SettingsService,
    private subscribeService: SubscribeService,
  ) {}

  async createUser(body: DtoAuth): Promise<DtoUser> {
    const { password, ...other } = body;
    const checkEmail = await this.findUser('email', body.email);
    if (checkEmail) throw new ConflictException();

    const hash = await bcrypt.hashSync(password, Number(process.env.BCRYPT_ROUNDS));
    const settings = await this.settingsService.createSettings();
    const list = await this.settingsService.createList();
    const message = await this.settingsService.createMessage();
    const subscribe = await this.subscribeService.createSubscribe();
    const user = await this.usersRepository.create({
      ...other,
      subscribe,
      settings,
      message,
      list,
      isActive: false,
      password: hash,
    });
    const profile = await this.usersRepository.save(user);
    // await this.mailerService.SendEmailRegistration(profile.email);
    return profile;
  }

  async createSocial(body: DtoAuth): Promise<DtoUser> {
    const checkEmail = await this.findUser('email', body.email);
    if (checkEmail) throw new ConflictException();
    const user = checkEmail ? await this.findUser('email', body.email) : await this.usersRepository.create(body);
    return await this.usersRepository.save(user);
  }

  async findUser(key: string, val: string): Promise<DtoUser> {
    return await this.usersRepository.findOne({ [key]: val }, { loadRelationIds: true });
  }

  async findFullUser(key: string, val: string) {
    return await this.usersRepository.findOne(
      { [key]: val },
      { relations: ['settings', 'list', 'message', 'articleLikes', 'answerLikes'] },
    );
  }

  async findRelate(key: string, val: string, relate: string[]): Promise<DtoUser> {
    return await this.usersRepository.findOne({ [key]: val }, { relations: [...relate] });
  }

  async updateUser(key: string, val: string, data: any): Promise<any> {
    return await this.usersRepository.update({ [key]: val }, { ...data }).then(async () => {
      return await this.findUser(key, val);
    });
  }
}
