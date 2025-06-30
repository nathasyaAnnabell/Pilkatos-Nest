import { Controller, Post, Req, Res, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import * as jwt from 'jsonwebtoken';

@Controller('token')
export class RefreshTokenController {
  constructor(private readonly prisma: PrismaService) {}

  @Post()
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    try {
      const cookies = req.cookies as { refreshToken?: string };
      const refreshToken = cookies.refreshToken;

      if (!refreshToken) {
        return res.sendStatus(HttpStatus.UNAUTHORIZED);
      }

      const user = await this.prisma.user.findFirst({
        where: { refresh_token: refreshToken },
      });

      if (!user || !user.refresh_token) {
        return res.sendStatus(HttpStatus.FORBIDDEN);
      }

      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET as string,
        (err) => {
          if (err) return res.sendStatus(HttpStatus.FORBIDDEN);

          const accessToken = jwt.sign(
            {
              NIS: user.NIS,
              nama: user.nama,
              role: user.role,
            },
            process.env.ACCESS_TOKEN_SECRET as string,
            { expiresIn: '5s' },
          );

          return res.json({ accessToken });
        },
      );
    } catch (error) {
      console.error(error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ msg: 'Internal server error' });
    }
  }
}
