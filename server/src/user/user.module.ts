import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { MailerModule } from '../mailer/mailer.module';
import { FileModule } from '../file/file.module';
import { SettingsModule } from '../settings/settings.module';
import { SubscribeModule } from '../subscribe/subscribe.module';

@Module({
  imports: [FileModule, MailerModule, SettingsModule, SubscribeModule, TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
