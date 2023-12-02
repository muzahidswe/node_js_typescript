import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MenuAccessService } from './menu-access.service';
import { CreateMenuAccessDto } from './dto/create-menu-access.dto';
import { UpdateMenuAccessDto } from './dto/update-menu-access.dto';

@Controller('menu-access')
export class MenuAccessController {
  constructor(private readonly menuAccessService: MenuAccessService) {}

  @Post()
  create(@Body() createMenuAccessDto: CreateMenuAccessDto) {
    return this.menuAccessService.create(createMenuAccessDto);
  }

  @Get()
  findAll() {
    return this.menuAccessService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuAccessService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenuAccessDto: UpdateMenuAccessDto) {
    return this.menuAccessService.update(+id, updateMenuAccessDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuAccessService.remove(+id);
  }
}
