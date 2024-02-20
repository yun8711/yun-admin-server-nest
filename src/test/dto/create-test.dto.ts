import { IsString, IsNumber, IsEmail, IsMobilePhone, Min, Max } from 'class-validator';

export class CreateTestDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsNumber()
  @Min(0)
  @Max(150)
  age: number;

  @IsEmail()
  email: string;

  @IsMobilePhone()
  phone: string;

  @IsString()
  address: string;
}
