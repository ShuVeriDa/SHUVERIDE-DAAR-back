import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @MinLength(6, {
    message: 'Password cannot be less than 6 characters',
  })
  @IsString()
  @IsOptional()
  password?: string;

  @IsOptional()
  @IsString()
  nickName?: string;

  @IsOptional()
  @IsBoolean()
  isAdmin?: boolean;

  @IsOptional()
  @IsString()
  avatar?: string;
}
