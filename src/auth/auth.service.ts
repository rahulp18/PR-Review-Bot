import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly client: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async createUpdateUser(data: any) {
    const { email, photos, displayName, id, accessToken } = data;
    const user = await this.client.user.upsert({
      where: { githubId: id },
      update: {
        username: displayName,
        avatarUrl: photos[0]?.value,
        githubId: id,
        email,
        accessToken,
      },
      create: {
        email,
        username: displayName,
        avatarUrl: photos[0]?.value,
        githubId: id,
        accessToken,
      },
    });

    const jwt = this.jwtService.sign({ userId: user.id });
    return { user, token: jwt };
  }

  async updateUserApiKey(user: any, apiKey: string) {
    const userId = user?.id;
    const hashedKey = await bcrypt.hash(apiKey, 10);
    return this.client.user.update({
      where: { id: userId },
      data: { openAiApiKey: hashedKey },
    });
  }
}
