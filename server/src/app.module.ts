import { Module } from '@nestjs/common';
import { config } from "dotenv";
import { join } from "path";
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ArticleModule } from './article/article.module';
import { UserModule } from './user/user.module';
import { UserEntity } from "./user/user.entity";
import { ArticleEntity } from "./article/article.entity";
import { LocalStrategy } from "./auth/local.strategy";
import { AuthService } from "./auth/auth.service";
import { MailerModule } from './mailer/mailer.module';
import { JwtStrategy } from "./auth/jwt.strategy";
import { FileModule } from './file/file.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import {GoogleStrategy} from "./auth/google.strategy";

config();

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [UserEntity,ArticleEntity],
      synchronize: true,
    }),
    AuthModule,
    ArticleModule,
    UserModule,
    MailerModule,
    FileModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, GoogleStrategy],
  exports: [AuthService],
})
export class AppModule {}
