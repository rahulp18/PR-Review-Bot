import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class AuthService {
    private readonly client;
    private readonly jwtService;
    constructor(client: PrismaService, jwtService: JwtService);
    createUpdateUser(data: any): Promise<{
        user: {
            email: string | null;
            id: string;
            accessToken: string | null;
            githubId: string;
            username: string;
            avatarUrl: string | null;
            openAiApiKey: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        token: string;
    }>;
    updateUserApiKey(user: any, apiKey: string): Promise<{
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
}
