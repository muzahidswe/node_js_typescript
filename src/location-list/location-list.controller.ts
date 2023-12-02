import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { LocationListService } from './location-list.service';
import { CreateLocationListDto, GetLocationListDto, UpdateDistributionPointDto } from './dto/location-list.dto';
import { UpdateLocationListDto } from './dto/update-location-list.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { AccessGuard } from 'src/guards/access.guard';

// @UseGuards(AccessGuard)
@Controller('location-list')
@UseGuards(JwtAuthGuard)
@ApiTags('Location-list')

export class LocationListController {
  constructor(private readonly locationListService: LocationListService) { }

  @Get()
  getLocationList(@Query() query) { //@Body() getLocationListDto: GetLocationListDto
    return this.locationListService.getLocationList(query);
  }

  @Get('browse-distribution-point')
  browseDistributionPoint(@Query() query){
    return this.locationListService.browseDistributionPoint(query);
  }
  
  @Post('update-distribution-point')
  updateDistributionPoint(@Body() updateDistributionPointDto: UpdateDistributionPointDto){
    return this.locationListService.updateDistributionPoint(updateDistributionPointDto);
  }

  @Get()
  findAll() {
    return this.locationListService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locationListService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLocationListDto: UpdateLocationListDto) {
    return this.locationListService.update(+id, updateLocationListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.locationListService.remove(+id);
  }
}
