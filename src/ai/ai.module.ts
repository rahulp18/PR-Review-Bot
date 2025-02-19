import { Module } from '@nestjs/common';
import OpenAI from 'openai';

import { AiService } from './ai.service';

@Module({
  controllers: [],
  providers: [
    AiService,
    {
      provide: 'OPENAI',
      useFactory: () => {
        return new OpenAI({
          apiKey: process.env.OPENAI_API_KEY,
        });
      },
    },
  ],
  exports: ['OPENAI', AiService],
})
export class AiModule {}
