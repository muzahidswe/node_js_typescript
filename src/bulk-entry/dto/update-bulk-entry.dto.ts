import { PartialType } from '@nestjs/swagger';
import { CreateBulkEntryDto } from './create-bulk-entry.dto';

export class UpdateBulkEntryDto extends PartialType(CreateBulkEntryDto) {}
