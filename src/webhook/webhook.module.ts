import { Module } from '@nestjs/common';
import { AiModule } from 'src/ai/ai.module';
import { GithubModule } from 'src/github/github.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';

@Module({
  imports: [GithubModule, AiModule],
  controllers: [WebhookController],
  providers: [WebhookService, PrismaService],
})
export class WebhookModule {}
