import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductTreeDto { }
export class GetProductTreeDto {
    @IsNotEmpty()
    @IsNumber()
    sbu_id: number;

    @IsOptional()
    @IsNumber()
    dep_id: number;

    @IsOptional()
    @IsNumber()
    outlet_id: number;
}
export class GetProductListDto {
    @IsNotEmpty()
    @IsNumber()
    sbu_id: number;

    @IsNotEmpty()
    @IsNumber()
    type: string;
}
