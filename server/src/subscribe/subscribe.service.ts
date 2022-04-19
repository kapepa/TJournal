import { Injectable } from '@nestjs/common';
import { DtoSubscribe } from '../dto/dto.subscribe';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubscribeEntity } from './subscribe.entity';

@Injectable()
export class SubscribeService {
  constructor(
    @InjectRepository(SubscribeEntity)
    private subscribeRepository: Repository<SubscribeEntity>,
  ) {}

  async createSubscribe(): Promise<DtoSubscribe> {
    const subscribe = await this.subscribeRepository.create();
    return await this.subscribeRepository.save(subscribe);
  }

  async findSubscribe(key: string, val: string): Promise<DtoSubscribe> {
    return await this.subscribeRepository.findOne({ [key]: val });
  }
}
