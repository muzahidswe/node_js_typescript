import { PartialType } from '@nestjs/swagger';
import { CreateFieldForceDto } from './create-field-force.dto';

export class UpdateFieldForceDto extends PartialType(CreateFieldForceDto) {}
