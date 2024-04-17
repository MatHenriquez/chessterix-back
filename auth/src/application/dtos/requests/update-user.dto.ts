import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString
} from 'class-validator';

export class UpdateUserDto {
  constructor(id: number, email?: string, password?: string) {
    this.id = id;
    this.email = email;
    this.password = password;
  }

  @IsNumber()
  @IsPositive()
  id: number;

  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;
}
