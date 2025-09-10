import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({
        example: 'John Doe',
        description: 'The name of the user',
        type: String,
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        example: 'john@example.com',
        description: 'The email of the user',
        type: String,
        format: 'email',
        required: true,
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example: 'password123',
        description: 'The password of the user',
        type: String,
        format: 'password',
        required: true,
        minLength: 6,
    })
    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    password: string;
}
