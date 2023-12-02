import { PartialType } from '@nestjs/swagger';
import { CreateProductTreeDto } from './product-tree.dto';

export class UpdateProductTreeDto extends PartialType(CreateProductTreeDto) {}
