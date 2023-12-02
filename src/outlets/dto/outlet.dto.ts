import { IsNotEmpty, IsNumber, IsString } from "class-validator";
export class CreateOutletDto { }
export class GetClassificationDto {
    @IsNotEmpty()
    @IsNumber()
    sbu_id: number;
}

export class GetListDto {
    @IsNotEmpty()
    @IsNumber()
    sbu_id: number;

    @IsNotEmpty()
    @IsString()
    dep_id: string;
}
