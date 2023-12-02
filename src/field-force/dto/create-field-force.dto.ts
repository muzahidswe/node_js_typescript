import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator';

export class CreateFieldForceDto {
  @IsNotEmpty()
  @IsNumber()
  sbu_id: number;

  @IsNotEmpty()
  @IsNumber()
  dep_id: number;

  @IsNotEmpty()
  @IsString()
  fullname: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  contact_no: string;

  @IsNumber()
  nid: number;

  @IsNotEmpty()
  @IsNumber()
  user_type: number;

  @IsString()
  password: string;
}

export class EditFieldForceDto {
  @IsNotEmpty()
  @IsNumber()
  sbu_id: number;

  @IsNotEmpty()
  @IsNumber()
  dep_id: number;

  @IsNotEmpty()
  @IsNumber()
  field_force_id: number;

  @IsNotEmpty()
  @IsString()
  user_type: String;

  @IsNotEmpty()
  @IsNumber()
  route_id: number;

  @IsNotEmpty()
  @IsNumber()
  strike: number;
}

export class EditFieldForceBasicInfoDto {
  
  @IsNotEmpty()
  @IsNumber()
  id: number;
  
  @IsNotEmpty()
  @IsNumber()
  sbu_id: number;

  @IsNotEmpty()
  @IsNumber()
  user_type: number;

  @IsNotEmpty()
  @IsString()
  fullname: String;

  @IsNotEmpty()
  @IsString()
  username: String;

  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  contact_no: string;

  @IsOptional()
  @IsNumber()
  nid: number;
}
