import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards
} from '@nestjs/common';
import { MenuService } from './menu.service';
import {
  CreateMenuDto,
  MenuItemDeleteDto,
  MenuListValidateDto,
  UpdateMenuDto
} from './dto/menu.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('menu')
@UseGuards(JwtAuthGuard)
@ApiTags('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  async getMenuList(@Query() getMenuDto: MenuListValidateDto) {
    return await this.menuService.dynamicMenuItem(getMenuDto);
  }
  @Delete()
  async removeAMenuItem(@Query() queryParams: MenuItemDeleteDto) {
    return await this.menuService.removeAMenuItem(queryParams);
  }

  @Post()
  async create(@Body() createMenuDto: CreateMenuDto) {
    return await this.menuService.create(createMenuDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return await this.menuService.update(+id, updateMenuDto);
  }
}
