import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './article.entity';
import { UserModule } from '../user/user.module';
import { FileModule } from '../file/file.module';
import { SubscribeModule } from '../subscribe/subscribe.module';
import { ChatModule } from '../chat/chat.module';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity]), UserModule, FileModule, SubscribeModule, ChatModule],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
