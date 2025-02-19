import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly client: PrismaService) {}

  async createUpdateUser(data: any) {
    const { email, photos, displayName, id } = data;
    return await this.client.user.upsert({
      where: { githubId: id },
      update: {
        username: displayName,
        avatarUrl: photos[0]?.value,
        githubId: id,
        email,
      },
      create: {
        email,
        username: displayName,
        avatarUrl: photos[0]?.value,
        githubId: id,
      },
    });
  }
}
