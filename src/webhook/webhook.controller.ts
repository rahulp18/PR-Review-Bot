import { Controller, Post, Query, Req } from '@nestjs/common';
import { WebhookService } from './webhook.service';

@Controller('github/webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post()
  async handleWebhook(@Req() req, @Query('userId') userId: string) {
    await this.webhookService.handlePRWebhook(req.body, userId);
  }
}
