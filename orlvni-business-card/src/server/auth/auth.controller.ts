import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('server/')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async logIn(@Body() body, @Res({ passthrough: true }) response: Response) {
    const validatedUser = await this.authService.validateUser(
      body.user_email,
      body.user_password,
    );

    if (validatedUser) {
      response.cookie(
        'jwt',
        (await this.authService.login(validatedUser)).access_token,
        {
          httpOnly: true,
        },
      );

      return { message: 'success' };
    }
    return { message: 'denied' };
  }

  @Post('/logout')
  LogOut(@Res({ passthrough: true }) response: Response) {
    console.log('not working');

    response.clearCookie('jwt');
    return {
      message: 'success',
    };
  }
}
