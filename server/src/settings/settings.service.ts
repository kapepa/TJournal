import { Injectable } from '@nestjs/common';
import { SettingsEntity } from './settings.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DtoSettings } from '../dto/dto.settings';
import { ListEntity } from './list.entity';
import { DtoList } from '../dto/dto.list';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(SettingsEntity)
    private settingsRepository: Repository<SettingsEntity>,
    @InjectRepository(ListEntity)
    private listRepository: Repository<ListEntity>,
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

  async listSettings(): Promise<DtoList> {
    const list = await this.listRepository.create();
    return await this.listRepository.save(list);
  }
}
