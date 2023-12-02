import { Module } from '@nestjs/common';
import { BulkEntryService } from './bulk-entry.service';
import { BulkEntryController } from './bulk-entry.controller';

@Module({
  controllers: [BulkEntryController],
  providers: [BulkEntryService]
})
export class BulkEntryModule {}
