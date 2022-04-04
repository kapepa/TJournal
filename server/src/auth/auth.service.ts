import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
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

  async AuthCreate (email: string) {
    const el = await this.mailerService.SendEmailRegistration(email);
    return null;
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findUser("email", email);
    const match = await bcrypt.compare(pass, user.password);

    if (match) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
