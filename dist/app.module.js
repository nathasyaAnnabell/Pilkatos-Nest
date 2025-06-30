"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const candidate_module_1 = require("./candidate/candidate.module");
const prisma_module_1 = require("./prisma/prisma.module");
const refresh_token_module_1 = require("./refresh-token/refresh-token.module");
const verify_token_middleware_1 = require("./verify-token/verify-token.middleware");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(verify_token_middleware_1.VerifyTokenMiddleware).forRoutes({
            path: 'api',
            method: common_1.RequestMethod.ALL,
        });
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            candidate_module_1.CandidateModule,
            prisma_module_1.PrismaModule,
            refresh_token_module_1.RefreshTokenModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map