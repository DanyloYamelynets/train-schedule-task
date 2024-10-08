import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(loginDto: { username: string; password: string }) {
    const { username } = loginDto;

    // Generate token without validation
    const payload = { username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
