import { Inject, Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  constructor(@Inject('OPENAI') private readonly openai: OpenAI) {}

  async analyzeCode(code: string): Promise<string> {
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: `Analyze the following code and provide only suggestions for optimization and best practices. Do not describe what the code does. Just return the necessary changes needed to improve performance, readability, or efficiency:\n\n\`\`\`typescript\n${code}\n\`\`\``,
        },
      ],
      temperature: 0.3, // Reduce randomness for more precise suggestions
    });

    return response.choices[0].message?.content || 'No suggestions found.';
  }
}
