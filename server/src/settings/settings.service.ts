import { Injectable } from '@nestjs/common';
import { SettingsEntity } from './settings.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DtoSettings } from '../dto/dto.settings';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(SettingsEntity)
    private settingsRepository: Repository<SettingsEntity>,
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
}
