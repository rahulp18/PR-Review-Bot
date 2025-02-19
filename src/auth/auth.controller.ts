import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import passport from 'passport';
import { AuthService } from './auth.service';
import { UpdateApiKeyDto } from './dto/update-api-key.dto';
@Controller('github/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get()
  @UseGuards(AuthGuard('github'))
  async githubAuth() {
    // initiates the GitHub OAuth flow
    passport.authenticate('github', { scope: ['email', 'profile'] });
  }
  @Get('callback')
  @UseGuards(AuthGuard('github'))
  async githubAuthRedirect(@Req() req: Request) {
    const user = await this.authService.createUpdateUser(req?.user);
    return {
      message: `Authentication Successful`,
      user,
    };
  }
  @Patch('update-api-key')
  @UseGuards(AuthGuard('jwt')) // Protect this route
  async updateApiKey(@Req() req: Request, @Body() body: UpdateApiKeyDto) {
    return this.authService.updateUserApiKey(req.user, body.openAiApiKey);
  }
}
