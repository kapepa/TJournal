import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { DtoSubscribe } from '../dto/dto.subscribe';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubscribeEntity } from './subscribe.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class SubscribeService {
  constructor(
    @InjectRepository(SubscribeEntity)
    private subscribeRepository: Repository<SubscribeEntity>,
    @Inject(forwardRef(() => UserService))
    private userRepository: UserService,
  ) {}

  async createSubscribe(): Promise<DtoSubscribe> {
    const subscribe = await this.subscribeRepository.create();
    return await this.subscribeRepository.save(subscribe);
  }

  async findSubscribe(key: string, val: string): Promise<DtoSubscribe> {
    return await this.subscribeRepository.findOne({ [key]: val });
  }

  async findFullSubscribe(key: string, val: string): Promise<DtoSubscribe> {
    return await this.subscribeRepository.findOne({ [key]: val }, { relations: ['user', 'subscribe'] });
  }

  async appendSubscribe(userID: string, subscribe: DtoSubscribe): Promise<any> {
    const { id } = subscribe;
    const user = await this.userRepository.findUser('id', userID);
    const exist = await this.findFullSubscribe('id', id);
    if (!Array.isArray(exist.subscribe)) exist.subscribe = [];

    const index = exist.subscribe.findIndex((el) => el.id === userID);
    if (index === -1) exist.subscribe.push(user);
    if (index !== -1) exist.subscribe.splice(index, 1);

    exist.subscribers = exist.subscribe.length;
    await this.subscribeRepository.save(exist);
    return await this.findFullSubscribe('id', id).then(async () => await this.findSubscribe('id', id));
  }
}
