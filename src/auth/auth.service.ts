import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async getUsers() {
    return this.prisma.user.findMany({
      select: { NIS: true, nama: true, kelas: true },
    });
  }

  async register(dto: RegisterDto) {
    const { nis, nama, kelas, password, confPassword } = dto;

    if (password !== confPassword) {
      throw new BadRequestException(
        'Password and Confirm Password do not match',
      );
    }

    const existingUser = await this.prisma.user.findUnique({
      where: { NIS: nis },
    });
    if (existingUser) {
      throw new BadRequestException('NIS is already registered');
    }

    const hash = await bcrypt.hash(password, 10);

    await this.prisma.user.create({
      data: {
        NIS: nis,
        nama,
        kelas,
        password: hash,
        role: 'USER',
      },
    });

    return { message: 'Register success' };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { NIS: dto.nis } });
    if (!user) throw new UnauthorizedException('User not found');

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Incorrect password');

    const payload = { NIS: user.NIS, nama: user.nama, role: user.role };

    const accessSecret = process.env.ACCESS_TOKEN_SECRET;
    const refreshSecret = process.env.REFRESH_TOKEN_SECRET;

    if (!accessSecret || !refreshSecret) {
      throw new Error('Missing JWT secret(s) in environment variables');
    }

    const accessToken = jwt.sign(payload, accessSecret, { expiresIn: '5s' });
    const refreshToken = jwt.sign(payload, refreshSecret, { expiresIn: '1d' });

    await this.prisma.user.update({
      where: { NIS: user.NIS },
      data: { refresh_token: refreshToken },
    });

    return { accessToken, refreshToken };
  }

  async logout(refreshToken: string) {
    const user = await this.prisma.user.findFirst({
      where: { refresh_token: refreshToken },
    });
    if (!user) return;

    await this.prisma.user.update({
      where: { NIS: user.NIS },
      data: { refresh_token: null },
    });
  }
}
