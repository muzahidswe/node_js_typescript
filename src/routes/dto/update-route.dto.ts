import { PartialType } from '@nestjs/swagger';
import { CreateRouteDto } from './route-info.dto';

export class UpdateRouteDto extends PartialType(CreateRouteDto) { }
