import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
export interface AuthenticatedRequest extends Request {
    email?: string;
}
export declare class VerifyTokenMiddleware implements NestMiddleware {
    use(req: AuthenticatedRequest, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
}
