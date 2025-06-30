/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  nis: string;

  @IsString()
  nama: string;

  @IsString()
  kelas: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @MinLength(8)
  confPassword: string;
}
