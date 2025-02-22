import {
  Body,
  Controller,
  Get,
  Patch,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { UpdateApiKeyDto } from './dto/update-api-key.dto';

@Controller('github/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Initiate GitHub OAuth flow - handled by the GitHub strategy
  @Get()
  @UseGuards(AuthGuard('github'))
  githubAuth() {
    // No need to call passport.authenticate manually, the guard does it.
  }

  // Callback endpoint after GitHub authentication
  @Get('callback')
  @UseGuards(AuthGuard('github'))
  async githubAuthRedirect(@Req() req: Request, @Res() res: Response) {
    // req.user is set by the GitHub strategy
    const data = await this.authService.createUpdateUser(req.user);
    return res.redirect(`http://localhost:5000/auth?token=${data?.token}`);
  }

  // Protected route to update the user's API key (JWT-based)
  @Patch('update-api-key')
  @UseGuards(AuthGuard('jwt'))
  async updateApiKey(@Req() req: Request, @Body() body: UpdateApiKeyDto) {
    console.log(body?.openAiApiKey);
    return this.authService.updateUserApiKey(req.user, body.openAiApiKey);
  }
  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async getMe(@Req() req: Request) {
    return req.user;
  }
}
