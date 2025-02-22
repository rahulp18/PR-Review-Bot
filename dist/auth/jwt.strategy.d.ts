import { PrismaService } from 'src/prisma/prisma.service';
declare const JwtStrategy_base: new (...args: any) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly prisma;
    constructor(prisma: PrismaService);
    validate(payload: {
        userId: string;
    }): Promise<{
        email: string | null;
        id: string;
        accessToken: string | null;
        githubId: string;
        username: string;
        avatarUrl: string | null;
        openAiApiKey: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
}
export {};
