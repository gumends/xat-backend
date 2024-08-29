import { IsNotEmpty } from "class-validator"

export class UpdateUserDto {
    @IsNotEmpty()
    firstName: string

    @IsNotEmpty()
    lastname: string
}