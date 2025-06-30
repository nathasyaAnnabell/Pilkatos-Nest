import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';
interface TypedRequest extends Request {
    cookies: {
        refreshToken?: string;
    };
}
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    getUsers(): Promise<{
        nama: string;
        kelas: string;
        NIS: string;
    }[]>;
    register(dto: RegisterDto): Promise<{
        message: string;
    }>;
    login(dto: LoginDto, res: Response): Promise<{
        accessToken: string;
    }>;
    logout(req: TypedRequest, res: Response): Promise<{
        message: string;
    } | undefined>;
}
export {};
