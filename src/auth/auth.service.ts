import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from 'src/users/dto/create.users.dto';
import { AuthLoginDTO } from './dto/auth.login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly Jwtservice: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async createToken() {
    //return this.Jwtservice.sign();
  }

  async verifyToken() {
    //return this.Jwtservice.verify();
  }

  async login(body: AuthLoginDTO) {
    const user = await this.prisma.user.findFirst({
      where: {
        email_usr: body.email,
        password_usr: body.password,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Informações incorretas');
    }

    return user;
  }
  async forget(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email_usr: email,
      },
    });

    if (!user) {
      throw new NotFoundException('Email incorreto');
    }

    return user;
  }
  async reset(newPassword: string, token: string) {
    const id = 1;
    await this.prisma.user.update({
      where: {
        id_usr: id,
      },
      data: {
        password_usr: newPassword,
      },
    });
  }
}
