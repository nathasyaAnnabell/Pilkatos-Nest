"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyTokenMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
let VerifyTokenMiddleware = class VerifyTokenMiddleware {
    use(req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.sendStatus(401);
        }
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err || !decoded || typeof decoded !== 'object') {
                return res.sendStatus(403);
            }
            const payload = decoded;
            req.email = payload.email;
            next();
        });
    }
};
exports.VerifyTokenMiddleware = VerifyTokenMiddleware;
exports.VerifyTokenMiddleware = VerifyTokenMiddleware = __decorate([
    (0, common_1.Injectable)()
], VerifyTokenMiddleware);
//# sourceMappingURL=verify-token.middleware.js.map