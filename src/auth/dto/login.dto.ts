/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  nis: string;

  @IsString()
  password: string;
}
