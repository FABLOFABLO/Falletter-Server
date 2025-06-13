import { Injectable } from '@nestjs/common';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';
import { Repository } from 'typeorm';
import { communityEntity } from './entities/community.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CommunityService {

  constructor(
    @InjectRepository(communityEntity)
    private readonly communityRepository: Repository<communityEntity>    
  ){}

  create(createCommunityDto: CreateCommunityDto) {
    return 'This action adds a new community';
  }

  findAll() {
    return `This action returns all community`;
  }

  findOne(id: number) {
    return `This action returns a #${id} community`;
  }

  update(id: number, updateCommunityDto: UpdateCommunityDto) {
    return `This action updates a #${id} community`;
  }

  remove(id: number) {
    return `This action removes a #${id} community`;
  }
}
