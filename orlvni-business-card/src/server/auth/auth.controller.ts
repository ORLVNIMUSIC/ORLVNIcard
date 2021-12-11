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

      response.cookie('user_id', validatedUser.user_id);

      return { message: 'success' };
    }
    return { message: 'denied' };
  }

  @Post('/logout')
  LogOut(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    response.clearCookie('user_id');
    return {
      message: 'success',
    };
  }
}
