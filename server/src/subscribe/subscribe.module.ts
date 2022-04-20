import {forwardRef, Module} from '@nestjs/common';
import { SubscribeEntity } from './subscribe.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscribeService } from './subscribe.service';
import { SubscribeController } from './subscribe.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([SubscribeEntity]), forwardRef(() => UserModule)],
  controllers: [SubscribeController],
  providers: [SubscribeService],
  exports: [SubscribeService],
})
export class SubscribeModule {}
