import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';  

import {UserEntity} from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SignInUserDto } from './dto/singin-user.dto';
import { JwtService } from '@nestjs/jwt';
const bcript = require('bcrypt');
require('dotenv').config();

@Injectable()
export class UserService {
  
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto): Promise<UserEntity>{
    // return 'This action adds a new user';

    if (!createUserDto.email.endsWith('@dsm.hs.kr')) {
      throw new BadRequestException('이메일은 @dsm.hs.kr 형식이어야합니다');
    }

    const hashedPWD = await bcrypt.hash(createUserDto.pw, 10);
    createUserDto.pw = hashedPWD;
    
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  async signin(SignInUserDto: SignInUserDto) {
    const user = await this.findOneByEmail(SignInUserDto.email);
    if(!user) throw new UnauthorizedException("존재하지 않는 이메일입니다.");

    const isMatch = await bcript.compare(SignInUserDto.pw, user.pw);
    if(!isMatch) throw new UnauthorizedException("비밀번호가 일치하지 않습니다.");

    const accessToken = this.jwtService.sign({sub: user.id, email: user.email}, {expiresIn: '1h'});
    const refreshToken = this.jwtService.sign({sug: user.id, email: user.email}, 
      {expiresIn: '30d', secret: process.env.JWT_REFRESH_SECRET || "defalt_secretKey"});

    user.refreshToken = refreshToken;

    await this.userRepository.save(user);

    return {accessToken, refreshToken};
  }

  // async findAll(): Promise<UserEntity[]> {
  //   // return `This action returns all user`;
  //   return this.userRepository.find();
  // }

  async findOneByEmail(email: string ): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { email } });
  
    if (!user) {
      throw new NotFoundException(`유저를 찾을 수 없습니다. (email: ${email})`);
    }
    return user;
  }
  
  async update(id: number, updateUserDto: UpdateUserDto){
    // return `This action updates a #${id} user`;

    const user = await this.userRepository.findOne({where: {id: id}});

    if(!user) throw new NotFoundException(`해당 유저는 존재하지 않습니다: ${user}`);

    Object.assign(user, updateUserDto);
    await this.userRepository.update(id, updateUserDto);

    return user;
  }

  // async remove(id: string) {
  //   // return `This action removes a #${id} user`;
  //   await this.userRepository.delete(id);
  //   return id;
  // }
}
