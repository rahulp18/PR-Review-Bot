import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { UpdateApiKeyDto } from './dto/update-api-key.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    githubAuth(): void;
    githubAuthRedirect(req: Request, res: Response): Promise<void>;
    updateApiKey(req: Request, body: UpdateApiKeyDto): Promise<{
        email: string | null;
        id: string;
        accessToken: string | null;
        githubId: string;
        username: string;
        avatarUrl: string | null;
        openAiApiKey: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getMe(req: Request): Promise<Express.User | undefined>;
}
