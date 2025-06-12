import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'wlqqhsownjtlqkf',
      signOptions: {expiresIn: '1h'}
    }),
    TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
