import { Injectable } from '@nestjs/common';
import { AiService } from 'src/ai/ai.service';
import { decrypt } from 'src/auth/helper';
import { GithubService } from 'src/github/github.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WebhookService {
  constructor(
    private readonly githubService: GithubService,
    private readonly aiService: AiService,
    private readonly prisma: PrismaService,
  ) {}

  async handlePRWebhook(payload: any, userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user?.openAiApiKey) {
      throw new Error('OPEN AI key missing ');
    }
    const storedToken = JSON.parse(user?.openAiApiKey!);
    const originalToken = decrypt(storedToken);

    if (payload.action === 'opened' || payload.action === 'synchronize') {
      const { owner, name } = payload.repository;
      const prNumber = payload.pull_request.number;

      const files = await this.githubService.getPRFiles(
        owner.login,
        name,
        prNumber,
      );
      const codeReview = await this.aiService.analyzeCode(
        files.map((f) => f.path).join('\n'),
        originalToken,
      );

      await this.githubService.commentOnPR(
        owner.login,
        name,
        prNumber,
        codeReview,
      );
    }
  }
}
