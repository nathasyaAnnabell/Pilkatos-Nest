import { Module } from '@nestjs/common';
import { RefreshTokenController } from './refresh-token.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [RefreshTokenController],
  providers: [PrismaService],
})
export class RefreshTokenModule {}
