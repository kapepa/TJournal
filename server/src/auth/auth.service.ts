import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import {UserService} from "../user/user.service";
import {DtoUser} from "../dto/dto.user";
import {MailerService} from "../mailer/mailer.service";

config();

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private mailerService: MailerService,
  ) {}

  async JwtToken (user: DtoUser): Promise<string> {
    const {password, ...other } = user
    const token = jwt.sign({id: user.id, name: user.name, created_at: user.created_at}, process.env.JWT_TOKEN);
    return token;
  }

  async AuthCreate () {
    return "asdas"
  }

  async validateUser(name: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(name);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
