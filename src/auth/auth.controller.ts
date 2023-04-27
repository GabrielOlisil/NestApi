import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from 'src/users/user.service';
import { AuthService } from './auth.service';
import { AuthForgetDTO } from './dto/auth.forget.dto';
import { AuthLoginDTO } from './dto/auth.login.dto';
import { AuthRegisterDTO } from './dto/auth.register.dto';
import { AuthResetDTO } from './dto/auth.reset.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly UserService: UserService,
    private readonly AuthService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() body: AuthLoginDTO) {
    return this.AuthService.login(body);
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDTO) {
    return this.AuthService.register(body);
  }

  @Post('forget')
  async forget(@Body() { email }: AuthForgetDTO) {
    return this.AuthService.forget(email);
  }

  @Post('reset')
  async reset(@Body() { password, token }: AuthResetDTO) {
    return this.AuthService.reset(password, token);
  }
}
