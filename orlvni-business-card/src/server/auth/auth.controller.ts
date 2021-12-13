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
          expires: new Date(Date.now() + 86400000),
          httpOnly: true,
        },
      );

      response.cookie('user_id', validatedUser.user_id, {
        expires: new Date(Date.now() + 86400000),
        httpOnly: false,
      });

      response.cookie('user_name', validatedUser.user_name.trim(), {
        expires: new Date(Date.now() + 86400000),
        httpOnly: false,
      });

      return { message: 'success' };
    }
    return { message: 'denied' };
  }

  @Post('/logout')
  LogOut(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    response.clearCookie('user_id');
    response.clearCookie('user_name');
    return {
      message: 'success',
    };
  }
}
