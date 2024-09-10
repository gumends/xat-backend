import { IsNotEmpty } from "class-validator"

export class UpdateUserDto {
    @IsNotEmpty()
    nome: string

    @IsNotEmpty()
    sobreNome: string
}