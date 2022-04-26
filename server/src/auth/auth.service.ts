import { BadRequestException, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { config } from 'dotenv';
import { UserService } from '../user/user.service';
import { DtoUser } from '../dto/dto.user';
import fetch from 'node-fetch';

config();

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async JwtToken(user: DtoUser): Promise<string> {
    console.log(user.id)
    const token = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_TOKEN);
    return token;
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findUser('email', email);
    const match = await bcrypt.compare(pass, user.password);
    if (match) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async CheckRecaptcha(recaptcha: string): Promise<boolean> {
    try {
      const res = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptcha}`,
        { method: 'POST' },
      ).then((res: any) => res.json());

      return res.success;
    } catch (err) {
      throw new BadRequestException();
    }
  }
}
