import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ArticleModule } from './article/article.module';
import { UserModule } from './user/user.module';
import { UserEntity } from "./user/user.entity";
import { ArticleEntity } from "./article/article.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'Admin12345',
      database: 't-journal',
      entities: [UserEntity,ArticleEntity],
      synchronize: true,
    }),
    AuthModule,
    ArticleModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
