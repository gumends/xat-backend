import { IsEmail, IsNotEmpty, Matches } from "class-validator"
import { regexHelper } from "src/helpers/regex.helper"

export class CreateUserDto {
    id: string

    @IsNotEmpty()
    nome: string

    @IsNotEmpty()
    sobreNome: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    // @Matches(regexHelper.password, { message: 'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial' })
    password: string

    avatar?: string
}