import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req
} from '@nestjs/common';
import { FieldForceService } from './field-force.service';
import { CreateFieldForceDto,EditFieldForceDto,EditFieldForceBasicInfoDto } from './dto/create-field-force.dto';
import { UpdateFieldForceDto } from './dto/update-field-force.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AccessGuard } from 'src/guards/access.guard';

@Controller('master-entry/field-force')
@UseGuards(AccessGuard)
@UseGuards(JwtAuthGuard)

export class FieldForceController {
  constructor(private readonly fieldForceService: FieldForceService) {}

  @Post('save-field-force')
  async create(@Body() createFieldForceDto: CreateFieldForceDto) {
    return await this.fieldForceService.saveFieldForce(createFieldForceDto);
  }

  @Get('get-sr-ss-info')
  async get_routes(@Req() request) {
    //return request.query;
    const dep_id= request.query.dep_id;
    const sbu_id= request.query.dep_id;
    return await this.fieldForceService.getSrSsInfo(dep_id,sbu_id);
  }

  @Get('get-filed-force-list')
  async get_ff_list(@Req() request) {   
    const sbu_id=request.query.sbu_id
    return await this.fieldForceService.getFieldForceList(sbu_id);
  }

  @Post('update-field-force')
  async update_ff(@Body() editFieldForceDto: EditFieldForceDto) {
    return await this.fieldForceService.updateFieldForce(editFieldForceDto);
  }

  @Post('update-field-force-basic-info')
  async update_ff_basic_info(@Body() editFieldForceBasicInfoDto: EditFieldForceBasicInfoDto) {
    //return editFieldForceBasicInfoDto;
    return await this.fieldForceService.updateFieldForceBasicInfo(editFieldForceBasicInfoDto);
  }

  /*
  @Get('get-routes/:dep_id')
  async get_routes(@Param('dep_id') dep_id: number) {
    return dep_id;
    return this.fieldForceService.getRoutes();
  }

  @Get()
  findAll() {
    return this.fieldForceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fieldForceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFieldForceDto: UpdateFieldForceDto) {
    return this.fieldForceService.update(+id, updateFieldForceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fieldForceService.remove(+id);
  }
  */
}
