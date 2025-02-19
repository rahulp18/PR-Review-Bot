import { Controller, Post, Req } from '@nestjs/common';
import { WebhookService } from './webhook.service';

@Controller('github/webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post()
  // @UseGuards(AuthGuard('jwt'))
  async handleWebhook(@Req() req) {
    await this.webhookService.handlePRWebhook(req.body);
  }
}
