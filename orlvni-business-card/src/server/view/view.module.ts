import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { ViewController } from './view.controller';
import { ViewService } from './view.service';

@Module({
  imports: [AuthModule],
  providers: [ViewService, ConfigService],
  controllers: [ViewController],
})
export class ViewModule {}
