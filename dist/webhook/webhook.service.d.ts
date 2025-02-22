import { AiService } from 'src/ai/ai.service';
import { GithubService } from 'src/github/github.service';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class WebhookService {
    private readonly githubService;
    private readonly aiService;
    private readonly prisma;
    constructor(githubService: GithubService, aiService: AiService, prisma: PrismaService);
    handlePRWebhook(payload: any, userId: string): Promise<void>;
}
