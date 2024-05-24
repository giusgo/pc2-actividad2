import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class StudentDto {
    
    @IsNotEmpty()
    @IsString()
    userName!: string

    @IsNotEmpty()
    @IsNumber()
    grade!: number
}