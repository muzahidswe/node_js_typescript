import { Injectable } from '@nestjs/common';
import { CreateBulkEntryDto } from './dto/create-bulk-entry.dto';
import { UpdateBulkEntryDto } from './dto/update-bulk-entry.dto';

@Injectable()
export class BulkEntryService {
  create(createBulkEntryDto: CreateBulkEntryDto) {
    return 'This action adds a new bulkEntry';
  }

  findAll() {
    return `This action returns all bulkEntry`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bulkEntry`;
  }

  update(id: number, updateBulkEntryDto: UpdateBulkEntryDto) {
    return `This action updates a #${id} bulkEntry`;
  }

  remove(id: number) {
    return `This action removes a #${id} bulkEntry`;
  }
}
