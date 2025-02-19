import { Injectable } from '@nestjs/common';
import { AiService } from 'src/ai/ai.service';
import { GithubService } from 'src/github/github.service';

@Injectable()
export class WebhookService {
  constructor(
    private readonly githubService: GithubService,
    private readonly aiService: AiService,
  ) {}

  async handlePRWebhook(payload: any) {
    console.log(payload);
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
