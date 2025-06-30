"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let AuthService = class AuthService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getUsers() {
        return this.prisma.user.findMany({
            select: { NIS: true, nama: true, kelas: true },
        });
    }
    async register(dto) {
        const { nis, nama, kelas, password, confPassword } = dto;
        if (password !== confPassword) {
            throw new common_1.BadRequestException('Password and Confirm Password do not match');
        }
        const existingUser = await this.prisma.user.findUnique({
            where: { NIS: nis },
        });
        if (existingUser) {
            throw new common_1.BadRequestException('NIS is already registered');
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
    async login(dto) {
        const user = await this.prisma.user.findUnique({ where: { NIS: dto.nis } });
        if (!user)
            throw new common_1.UnauthorizedException('User not found');
        const isMatch = await bcrypt.compare(dto.password, user.password);
        if (!isMatch)
            throw new common_1.UnauthorizedException('Incorrect password');
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
    async logout(refreshToken) {
        const user = await this.prisma.user.findFirst({
            where: { refresh_token: refreshToken },
        });
        if (!user)
            return;
        await this.prisma.user.update({
            where: { NIS: user.NIS },
            data: { refresh_token: null },
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map