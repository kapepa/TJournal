import { Injectable } from '@nestjs/common';
import { SettingsEntity } from './settings.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(SettingsEntity)
    private usersRepository: Repository<SettingsEntity>,
  ) {}

  async createSettings(): Promise<any> {
    return '';
  }
}
