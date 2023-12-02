import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GlobalService } from 'src/utils/global.service';
import { EntityNotFoundError } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { RolesRepository } from './roles.repository';

@Injectable()
export class RolesService {
  
  constructor(
    @InjectRepository(RolesRepository)
    private readonly rolesRepository: RolesRepository,
  ) {
  }
  async create(createRoleDto: CreateRoleDto) : Promise <Role> {
    
    const role = new Role();
    role.sbu_id = createRoleDto.sbu_id;
    role.name = createRoleDto.name;
    role.created_by = GlobalService.userId;
    role.can_edit = createRoleDto.can_edit;
    return await this.rolesRepository.save(role);

  }

  async findAll() {
     return await this.rolesRepository.find();
  }

  async findOne(id: number) {
    return await this.rolesRepository.findOne(id);
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  async remove(id: number) {
    const deleteResponse = await this.rolesRepository.softDelete(id);
    if (!deleteResponse.affected) {
      throw new NotFoundException;
    }
    return {
      success: true,
      message: 'Deleted Successfully'
    }
  }
}
