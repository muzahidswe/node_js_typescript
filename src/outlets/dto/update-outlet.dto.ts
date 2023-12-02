import { PartialType } from '@nestjs/swagger';
import { CreateOutletDto } from './outlet.dto';

export class UpdateOutletDto extends PartialType(CreateOutletDto) { }
