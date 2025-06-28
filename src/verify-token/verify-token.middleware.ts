import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class VerifyTokenMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    next();
  }
}
