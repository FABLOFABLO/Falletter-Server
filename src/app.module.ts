import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
require('dotenv').config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: 3306,
      // host: process.env.DB_HOST,
      // username: process.env.DB_NAME,
      // password: process.env.DB_PWD,
      // database: process.env.DB_DB,
      host: 'localhost',
      username: 'root',
      password: 'user',
      database: 'falletter',
      entities: [UserEntity],
      synchronize: true // 배포할때 주석처리하기
    }),    
    UserModule, AuthModule,
    /* the Module containing "UserEntityRepository" */],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
