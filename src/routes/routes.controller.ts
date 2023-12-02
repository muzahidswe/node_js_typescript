import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { CreateRouteDto, GetRouteDto } from './dto/route-info.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AccessGuard } from 'src/guards/access.guard';

// @UseGuards(AccessGuard)
@Controller('routes')
@UseGuards(JwtAuthGuard)
@ApiTags('Routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) { }

  @Get('route-list')
  getRouteList(@Query() query) {
    return this.routesService.getRouteList(query);
  }

  @Get('target-outlet')
  getTargetOutlet(@Query() query) {
    return this.routesService.getRouteWiseTargetOutlet(query);
  }

  @Post()
  create(@Body() createRouteDto: CreateRouteDto) {
    return this.routesService.create(createRouteDto);
  }

  @Get()
  findAll() {
    return this.routesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.routesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRouteDto: UpdateRouteDto) {
    return this.routesService.update(+id, updateRouteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.routesService.remove(+id);
  }
}
