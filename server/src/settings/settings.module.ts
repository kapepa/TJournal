import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingsEntity } from './settings.entity';
import { ListEntity } from './list.entity';
import { MessageEntity } from './message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SettingsEntity, ListEntity, MessageEntity])],
  providers: [SettingsService],
  controllers: [SettingsController],
  exports: [SettingsService],
})
export class SettingsModule {}
