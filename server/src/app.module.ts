import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ArticleModule } from './article/article.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Admin12345',
      database: 't-journal',
      entities: [],
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
