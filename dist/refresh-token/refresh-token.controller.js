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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const jwt = require("jsonwebtoken");
let RefreshTokenController = class RefreshTokenController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async refreshToken(req, res) {
        try {
            const cookies = req.cookies;
            const refreshToken = cookies.refreshToken;
            if (!refreshToken) {
                return res.sendStatus(common_1.HttpStatus.UNAUTHORIZED);
            }
            const user = await this.prisma.user.findFirst({
                where: { refresh_token: refreshToken },
            });
            if (!user || !user.refresh_token) {
                return res.sendStatus(common_1.HttpStatus.FORBIDDEN);
            }
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err) => {
                if (err)
                    return res.sendStatus(common_1.HttpStatus.FORBIDDEN);
                const accessToken = jwt.sign({
                    NIS: user.NIS,
                    nama: user.nama,
                    role: user.role,
                }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5s' });
                return res.json({ accessToken });
            });
        }
        catch (error) {
            console.error(error);
            return res
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ msg: 'Internal server error' });
        }
    }
};
exports.RefreshTokenController = RefreshTokenController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RefreshTokenController.prototype, "refreshToken", null);
exports.RefreshTokenController = RefreshTokenController = __decorate([
    (0, common_1.Controller)('token'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RefreshTokenController);
//# sourceMappingURL=refresh-token.controller.js.map