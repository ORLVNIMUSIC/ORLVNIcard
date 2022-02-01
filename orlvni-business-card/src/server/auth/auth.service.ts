import { Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByNickname(email);
    if (user) {
      if (await bcrypt.compare(pass, user.user_password)) {
        const { user_password, ...result } = user;

        return result;
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = { id: user.user_id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async checkJwt(jwt: any): Promise<boolean> {
    try {
      const data = await this.jwtService.verifyAsync(jwt);
      if (!data) {
        return false;
      }
      return true;
    } catch {
      return false;
    }
  }
}
