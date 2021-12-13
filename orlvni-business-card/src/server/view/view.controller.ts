import { Controller, Get, Res, Req, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from '../auth/auth.service';

import { ViewService } from './view.service';

@Controller('/')
export class ViewController {
  constructor(
    private viewService: ViewService,
    private authService: AuthService,
  ) {}

  @Get('products')
  public async showProducts(@Req() req: Request, @Res() res: Response) {
    if (await this.authService.checkJwt(req.cookies['jwt'])) {
      await this.viewService.handler(req, res);
    } else {
      res.redirect(`${process.env.ORIGIN}/login`);
    }
  }

  @Get('orders')
  public async showOrders(@Req() req: Request, @Res() res: Response) {
    if (await this.authService.checkJwt(req.cookies['jwt'])) {
      await this.viewService.handler(req, res);
    } else {
      res.redirect(`${process.env.ORIGIN}/login`);
    }
  }

  @Get('products/create')
  public async showCreateProduct(@Req() req: Request, @Res() res: Response) {
    if (await this.authService.checkJwt(req.cookies['jwt'])) {
      await this.viewService.handler(req, res);
    } else {
      res.redirect(`${process.env.ORIGIN}/login`);
    }
  }

  @Get('products/:id')
  public async showOneProduct(@Req() req: Request, @Res() res: Response) {
    if (await this.authService.checkJwt(req.cookies['jwt'])) {
      await this.viewService.handler(req, res);
    } else {
      res.redirect(`${process.env.ORIGIN}/login`);
    }
  }

  @Get('users')
  public async showUsers(@Req() req: Request, @Res() res: Response) {
    if (await this.authService.checkJwt(req.cookies['jwt'])) {
      await this.viewService.handler(req, res);
    } else {
      res.redirect(`${process.env.ORIGIN}/login`);
    }
  }

  @Get('/')
  public async showHome(@Req() req: Request, @Res() res: Response) {
    if (await this.authService.checkJwt(req.cookies['jwt'])) {
      await this.viewService.handler(req, res);
    } else {
      res.redirect(`${process.env.ORIGIN}/login`);
    }
  }

  @Get('login')
  public async showLogin(@Req() req: Request, @Res() res: Response) {
    await this.viewService.handler(req, res);
  }

  @Get('signup')
  public async showSignup(@Req() req: Request, @Res() res: Response) {
    await this.viewService.handler(req, res);
  }

  @Get('_next*')
  public async assets(@Req() req: Request, @Res() res: Response) {
    await this.viewService.handler(req, res);
  }

  @Get('favicon.ico')
  public async favicon(@Req() req: Request, @Res() res: Response) {
    await this.viewService.handler(req, res);
  }
}
