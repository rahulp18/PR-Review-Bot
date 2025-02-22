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
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const helper_1 = require("./helper");
let AuthService = class AuthService {
    constructor(client, jwtService) {
        this.client = client;
        this.jwtService = jwtService;
    }
    async createUpdateUser(data) {
        const { email, photos, displayName, id, accessToken } = data;
        const user = await this.client.user.upsert({
            where: { githubId: id },
            update: {
                username: displayName,
                avatarUrl: photos[0]?.value,
                githubId: id,
                email,
                accessToken,
            },
            create: {
                email,
                username: displayName,
                avatarUrl: photos[0]?.value,
                githubId: id,
                accessToken,
            },
        });
        const jwt = this.jwtService.sign({ userId: user.id });
        return { user, token: jwt };
    }
    async updateUserApiKey(user, apiKey) {
        const userId = user?.id;
        const encryptedToken = (0, helper_1.encrypt)(apiKey);
        const encryptedTokenString = JSON.stringify(encryptedToken);
        return this.client.user.update({
            where: { id: userId },
            data: { openAiApiKey: encryptedTokenString },
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map