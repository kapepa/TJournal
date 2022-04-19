import { Module } from '@nestjs/common';
import { SubscribeEntity } from './subscribe.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscribeService } from './subscribe.service';
import { SubscribeController } from './subscribe.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SubscribeEntity])],
  controllers: [SubscribeController],
  providers: [SubscribeService],
  exports: [SubscribeService],
})
export class SubscribeModule {}
