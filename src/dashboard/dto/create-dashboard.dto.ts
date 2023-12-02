import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator';
export class CreateDashboardDto {
  @IsNotEmpty()
  @IsNumber()
  sbu_id: number;

  @IsNotEmpty()
  @IsNumber()
  dep_id: number;

  @IsNotEmpty()
  @IsString()
  date_range: string;
}
