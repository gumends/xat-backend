import { IsEmail, IsNotEmpty, Matches } from "class-validator"
import { regexHelper } from "src/helpers/regex.helper"

export class CreateUserDto {
    @IsNotEmpty()
    id: string

    @IsNotEmpty()
    firstName: string

    @IsNotEmpty()
    lastname: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @Matches(regexHelper.password, { message: 'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial' })
    password: string
}