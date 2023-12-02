import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateLocationTreeDto {

}
export class GetLocationTreeDto {
    @IsNotEmpty()
    @IsNumber()
    sbu_id: number;

    @IsNotEmpty()
    @IsString()
    dep_id: string;

    @IsOptional()
    @IsString()
    lotation_to: string;
}