import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateRoleDto {

    @IsNotEmpty()
    @IsNumber()
    sbu_id: number;
  
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsOptional()
    @IsString()
    remark: string;
  
    @IsOptional()
    @IsBoolean()
    can_view: boolean;

    @IsOptional()
    @IsBoolean()
    can_insert: boolean;

    @IsOptional()
    @IsBoolean()
    can_edit: boolean;

    @IsOptional()
    @IsBoolean()
    can_delete: boolean;

    @IsOptional()
    @IsBoolean()
    can_export: boolean;

    @IsOptional()
    @IsBoolean()
    status: boolean;

    @IsOptional()
    @IsDate()
    created_at: Date;

    @IsOptional()
    @IsNumber()
    created_by: number;

    @IsOptional()
    @IsDate()
    updated_at: Date;

    @IsOptional()
    @IsNumber()
    updated_by: number;

    @IsOptional()
    @IsDate()
    deleted_at: Date;

}
 