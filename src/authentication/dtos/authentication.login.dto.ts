import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthLoginDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  password: string;
}
