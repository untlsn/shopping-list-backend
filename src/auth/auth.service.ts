import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  createToken(sub: number) {
    return this.jwtService.sign({ sub });
  }
}
