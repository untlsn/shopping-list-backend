import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async register(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const user = await this.userService.getByEmail(email);

    if (user) {
      throw new HttpException(
        'User with this email exist',
        HttpStatus.CONFLICT,
      );
    }

    return this.userService.create(email, password);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @HttpCode(200)
  login(@Req() req) {
    const id = req.user.id;

    return {
      id,
      authToken: this.authService.createToken(id),
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  auth() {
    return;
  }
}
