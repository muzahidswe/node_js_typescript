import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateLocationListDto {}

export class GetLocationListDto {
    @IsNotEmpty()
    @IsNumber()
    sbu_id: number;

    @IsNotEmpty()
    @IsNumber()
    location_type: number;
}

export class UpdateDistributionPointDto{
    @IsNotEmpty()
    @IsNumber()
    dep_id : number;

    @IsOptional()
    email: string;
    
    @IsOptional()
    contact_no: string;
    
    @IsOptional()
    address: string;
    
    @IsOptional()
    skus: string; 
}
