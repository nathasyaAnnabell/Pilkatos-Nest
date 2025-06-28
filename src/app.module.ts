import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CandidateModule } from './candidate/candidate.module';
import { RefreshTokenController } from './refresh-token/refresh-token.controller';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UsersModule, AuthModule, CandidateModule, PrismaModule],
  controllers: [AppController, RefreshTokenController],
  providers: [AppService],
})
export class AppModule {}
