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
import { OutletsService } from './outlets.service';
import { CreateOutletDto, GetListDto } from './dto/outlet.dto';
import { UpdateOutletDto } from './dto/update-outlet.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AccessGuard } from 'src/guards/access.guard';

// @UseGuards(AccessGuard)
@Controller('outlets')
@UseGuards(JwtAuthGuard)
@ApiTags('Outlets')
export class OutletsController {
  constructor(private readonly outletsService: OutletsService) {}

  @Post()
  create(@Body() createOutletDto: CreateOutletDto) {
    return this.outletsService.create(createOutletDto);
  }

  @Get('classification')
  getRouteList(@Query() query) {
    return this.outletsService.getOutletClassification(query);
  }

  @Post('list')
  getOutletList(@Body() getListDto: GetListDto) {
    return this.outletsService.getOutletList(getListDto);
  }

  @Get()
  findAll() {
    return this.outletsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.outletsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOutletDto: UpdateOutletDto) {
    return this.outletsService.update(+id, updateOutletDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.outletsService.remove(+id);
  }
}
