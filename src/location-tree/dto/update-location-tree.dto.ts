import { PartialType } from '@nestjs/swagger';
import { CreateLocationTreeDto } from './location-tree.dto';

export class UpdateLocationTreeDto extends PartialType(CreateLocationTreeDto) {}
