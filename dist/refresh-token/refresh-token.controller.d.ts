import { Request, Response } from 'express';
import { PrismaService } from '../prisma/prisma.service';
export declare class RefreshTokenController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    refreshToken(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
