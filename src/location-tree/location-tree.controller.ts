import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { LocationTreeService } from './location-tree.service';
import { CreateLocationTreeDto, GetLocationTreeDto } from './dto/location-tree.dto';
import { UpdateLocationTreeDto } from './dto/update-location-tree.dto';
import { ApiTags } from '@nestjs/swagger';
import { AccessGuard } from 'src/guards/access.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

// @UseGuards(AccessGuard)
@Controller('location-tree')
@UseGuards(JwtAuthGuard)
@ApiTags('Location-tree')

export class LocationTreeController {
  constructor(private readonly locationTreeService: LocationTreeService) { }

  @Post()
  getLocationTree(@Body() getLocationTreeDto: GetLocationTreeDto) {
    return this.locationTreeService.getLocationTree(getLocationTreeDto);
  }

  
  @Get('get-route-list')
  get_route_list(@Query() query){
    return this.locationTreeService.get_route_list(query);
  }

  @Get('get-active-route-list')
  get_active_route_list(@Query() query){
    return this.locationTreeService.get_active_route_list(query);
  }

  @Get('get-section-list')
  get_section_list(@Query() query){
    return this.locationTreeService.get_section_list(query);
  }

  @Get()
  findAll() {
    return this.locationTreeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locationTreeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLocationTreeDto: UpdateLocationTreeDto) {
    return this.locationTreeService.update(+id, updateLocationTreeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.locationTreeService.remove(+id);
  }
}
