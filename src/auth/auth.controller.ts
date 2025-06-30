import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';

interface TypedRequest extends Request {
  cookies: {
    refreshToken?: string;
  };
}

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('users')
  @HttpCode(200)
  async getUsers() {
    return this.authService.getUsers();
  }

  @Post('register')
  @HttpCode(201)
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.login(dto);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return { accessToken };
  }

  @Post('logout')
  @HttpCode(200)
  async logout(
    @Req() req: TypedRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return;

    await this.authService.logout(refreshToken);
    res.clearCookie('refreshToken');
    return { message: 'Logout success' };
  }
}
