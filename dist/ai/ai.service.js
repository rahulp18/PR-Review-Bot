"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiService = void 0;
const common_1 = require("@nestjs/common");
const openai_1 = require("openai");
let AiService = class AiService {
    async analyzeCode(code, userApiKey) {
        if (!userApiKey) {
            throw new Error('API Key is required');
        }
        const openai = new openai_1.default({
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
            temperature: 0.2,
        });
        return response.choices[0].message?.content || 'No suggestions found.';
    }
};
exports.AiService = AiService;
exports.AiService = AiService = __decorate([
    (0, common_1.Injectable)()
], AiService);
//# sourceMappingURL=ai.service.js.map