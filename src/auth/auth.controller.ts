import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import passport from 'passport';
import { AuthService } from './auth.service';
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
}
