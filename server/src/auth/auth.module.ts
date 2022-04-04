import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import {AuthService} from "./auth.service";
import {UserModule} from "../user/user.module";
import {LocalStrategy} from "./local.strategy";
import {PassportModule} from "@nestjs/passport";
import { JwtModule } from '@nestjs/jwt';
import {JwtStrategy} from "./jwt.strategy";
import { config } from 'dotenv';
import {MailerModule} from "../mailer/mailer.module";

config();

@Module({
  imports: [
    UserModule,
    MailerModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_TOKEN,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}