import { PartialType } from '@nestjs/swagger';
import { CreateMenuAccessDto } from './create-menu-access.dto';

export class UpdateMenuAccessDto extends PartialType(CreateMenuAccessDto) {}
