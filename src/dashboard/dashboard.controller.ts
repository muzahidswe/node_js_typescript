import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { AccessGuard } from 'src/guards/access.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('master-entry/dashboard')
@UseGuards(AccessGuard)
@UseGuards(JwtAuthGuard)

export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}
  
  @Post('get-dashbord-data')
  async get_dashbord_data(@Body() createDashboardDto: CreateDashboardDto) {
    return await this.dashboardService.getDashboardData(createDashboardDto);
  }

  /*
  @Post()
  create(@Body() createDashboardDto: CreateDashboardDto) {
    return this.dashboardService.create(createDashboardDto);
  }

  @Get()
  findAll() {
    return this.dashboardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dashboardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDashboardDto: UpdateDashboardDto) {
    return this.dashboardService.update(+id, updateDashboardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dashboardService.remove(+id);
  }
  */
}
