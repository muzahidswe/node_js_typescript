import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRouteDto { }
export class GetRouteDto {
    @IsNotEmpty()
    @IsNumber()
    sbu_id: number;

    @IsNotEmpty()
    @IsNumber()
    dep_id: number;
}
export class GetRouteWiseTargetDto {
    @IsNotEmpty()
    @IsNumber()
    sbu_id: number;

    @IsNotEmpty()
    @IsNumber()
    section_id: string;
}
