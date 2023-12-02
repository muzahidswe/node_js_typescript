import { PartialType } from '@nestjs/swagger';
import { CreateLocationListDto } from './location-list.dto';

export class UpdateLocationListDto extends PartialType(CreateLocationListDto) {}
