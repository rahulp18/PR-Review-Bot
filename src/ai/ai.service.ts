import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  async analyzeCode(code: string, userApiKey: string): Promise<string> {
    if (!userApiKey) {
      throw new Error('API Key is required');
    }
    const openai = new OpenAI({
      apiKey: userApiKey,
    });
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: `Analyze the following code and provide ONLY optimization suggestions focused on performance, readability, and efficiency improvements. Do not describe what the code does; only list the necessary changes to improve the code:

\`\`\`
${code}
\`\`\``,
        },
      ],
      temperature: 0.2, // Reduce randomness for more precise suggestions
    });

    return response.choices[0].message?.content || 'No suggestions found.';
  }
}
