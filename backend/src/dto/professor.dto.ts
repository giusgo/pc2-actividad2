import { IsNotEmpty, IsString } from "class-validator"

export class ProfessorDto {

    @IsNotEmpty()
    @IsString()
    username!: string 

    @IsNotEmpty()
    @IsString()
    password!: string
}