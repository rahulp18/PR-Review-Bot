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
exports.WebhookService = void 0;
const common_1 = require("@nestjs/common");
const ai_service_1 = require("../ai/ai.service");
const helper_1 = require("../auth/helper");
const github_service_1 = require("../github/github.service");
const prisma_service_1 = require("../prisma/prisma.service");
let WebhookService = class WebhookService {
    constructor(githubService, aiService, prisma) {
        this.githubService = githubService;
        this.aiService = aiService;
        this.prisma = prisma;
    }
    async handlePRWebhook(payload, userId) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user?.openAiApiKey) {
            throw new Error('OPEN AI key missing ');
        }
        const storedToken = JSON.parse(user?.openAiApiKey);
        const originalToken = (0, helper_1.decrypt)(storedToken);
        if (payload.action === 'opened' || payload.action === 'synchronize') {
            const { owner, name } = payload.repository;
            const prNumber = payload.pull_request.number;
            const files = await this.githubService.getPRFiles(owner.login, name, prNumber);
            const codeReview = await this.aiService.analyzeCode(files.map((f) => f.path).join('\n'), originalToken);
            await this.githubService.commentOnPR(owner.login, name, prNumber, codeReview);
        }
    }
};
exports.WebhookService = WebhookService;
exports.WebhookService = WebhookService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [github_service_1.GithubService,
        ai_service_1.AiService,
        prisma_service_1.PrismaService])
], WebhookService);
//# sourceMappingURL=webhook.service.js.map