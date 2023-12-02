import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BulkEntryService } from './bulk-entry.service';
import { CreateBulkEntryDto } from './dto/create-bulk-entry.dto';
import { UpdateBulkEntryDto } from './dto/update-bulk-entry.dto';

@Controller('bulk-entry')
export class BulkEntryController {
  constructor(private readonly bulkEntryService: BulkEntryService) {}

  @Post()
  create(@Body() createBulkEntryDto: CreateBulkEntryDto) {
    return this.bulkEntryService.create(createBulkEntryDto);
  }

  @Get()
  findAll() {
    return this.bulkEntryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bulkEntryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBulkEntryDto: UpdateBulkEntryDto) {
    return this.bulkEntryService.update(+id, updateBulkEntryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bulkEntryService.remove(+id);
  }
}
