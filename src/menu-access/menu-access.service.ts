import { Injectable } from '@nestjs/common';
import { CreateMenuAccessDto } from './dto/create-menu-access.dto';
import { UpdateMenuAccessDto } from './dto/update-menu-access.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MasterMenuAccessRepository } from '../database_table/repository/master-menu-access.repository';

@Injectable()
export class MenuAccessService {
  constructor(
    @InjectRepository(MasterMenuAccessRepository)
    private readonly masterMenuAccessRepository: MasterMenuAccessRepository
  ) {}
  create(createMenuAccessDto: CreateMenuAccessDto) {
    return 'This action adds a new menuAccess';
  }

  findAll() {
    return `This action returns all menuAccess`;
  }

  findOne(id: number) {
    return `This action returns a #${id} menuAccess`;
  }

  update(id: number, updateMenuAccessDto: UpdateMenuAccessDto) {
    return `This action updates a #${id} menuAccess`;
  }

  remove(id: number) {
    return `This action removes a #${id} menuAccess`;
  }
}
