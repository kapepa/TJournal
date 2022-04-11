import { Injectable } from '@nestjs/common';
import { SettingsEntity } from './settings.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DtoSettings } from '../dto/dto.settings';
import { ListEntity } from './list.entity';
import { DtoList } from '../dto/dto.list';
import { MessageEntity } from './message.entity';
import { DtoMessage } from '../dto/dto.message';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(SettingsEntity)
    private settingsRepository: Repository<SettingsEntity>,
    @InjectRepository(ListEntity)
    private listRepository: Repository<ListEntity>,
    @InjectRepository(MessageEntity)
    private messageRepository: Repository<MessageEntity>,
  ) {}

  async createSettings(): Promise<DtoSettings> {
    const settings = await this.settingsRepository.create();
    return await this.settingsRepository.save(settings);
  }

  async findSettings(key: string, val: string): Promise<DtoSettings> {
    return await this.settingsRepository.findOne({ [key]: val });
  }

  async updateSettings(key: string, val: string, data: any): Promise<any> {
    const settings = await this.settingsRepository
      .update({ [key]: val }, { ...data })
      .then(async () => await this.findSettings(key, val));
    return settings;
  }

  async createList(): Promise<DtoList> {
    const list = await this.listRepository.create();
    return await this.listRepository.save(list);
  }

  async findList(key: string, val: string): Promise<DtoList> {
    return await this.listRepository.findOne({ [key]: val });
  }

  async updateList(key: string, val: string, data: any): Promise<DtoList> {
    const list = await this.listRepository
      .update({ [key]: val }, { ...data })
      .then(async () => await this.findList(key, val));
    return list;
  }

  async createMessage(): Promise<DtoMessage> {
    const message = await this.messageRepository.create();
    return await this.messageRepository.save(message);
  }

  async findMessage(key: string, val: string): Promise<DtoMessage> {
    return await this.messageRepository.findOne({ [key]: val });
  }

  async updateMessage(
    key: string,
    val: string,
    data: any,
  ): Promise<DtoMessage> {
    const list = await this.messageRepository
      .update({ [key]: val }, { ...data })
      .then(async () => await this.findMessage(key, val));
    return list;
  }
}
