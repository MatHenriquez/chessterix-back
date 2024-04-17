import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 30)
  password: string;
}
