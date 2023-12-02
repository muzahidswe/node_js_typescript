import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class MenuDto {}
export class MenuListValidateDto {
  @IsNumber()
  @IsNotEmpty()
  sbu_id: number;

  @IsNumber()
  @IsNotEmpty()
  module_id: number;

  @IsOptional()
  user_type: number;

  @IsOptional()
  user_id: number;
}

export class MenuItemDeleteDto {
  @IsNumber()
  @IsNotEmpty()
  sbu_id: number;

  @IsNumber()
  @IsNotEmpty()
  id: number;
}

export class CreateMenuDto {
  @IsNotEmpty()
  @IsNumber()
  sbu_id: number;

  @IsNotEmpty()
  @IsNumber()
  module_id: number;

  @IsOptional()
  user_type: number;

  @IsOptional()
  user_id: number;

  @IsNotEmpty()
  @IsString()
  menu_name: string;

  @IsNumber()
  @IsNotEmpty()
  parent_menu_id: number;

  @IsNotEmpty()
  @IsNumber()
  menu_type: number;

  @IsNotEmpty()
  @IsString()
  menu_url: string;

  @IsNotEmpty()
  @IsString()
  menu_icon_class: string;

  @IsNotEmpty()
  @IsNumber()
  menu_order: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  status: number;
}

export class UpdateMenuDto {
  @IsNotEmpty()
  @IsNumber()
  sbu_id: number;

  @IsOptional()
  module_id: number;

  @IsOptional()
  user_type: number;

  @IsOptional()
  user_id: number;

  @IsOptional()
  menu_name: string;

  @IsOptional()
  parent_menu_id: number;

  @IsOptional()
  menu_type: number;

  @IsOptional()
  menu_url: string;

  @IsOptional()
  menu_icon_class: string;

  @IsOptional()
  menu_order: number;

  @IsOptional()
  description: string;

  @IsOptional()
  status: number;
}
