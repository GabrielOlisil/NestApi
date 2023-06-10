import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/users/user.service';
import { AuthLoginDTO } from './dto/auth.login.dto';
import { AuthRegisterDTO } from './dto/auth.register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly Jwtservice: JwtService,
    private readonly prisma: PrismaService,
    private readonly UserService: UserService,
  ) {}

  createToken(user: User) {
    return {
      accessToken: this.Jwtservice.sign(
        {
          id: user.id_usr,
          name: user.name_usr,
          email: user.email_usr,
        },
        {
          expiresIn: '10 hours',
          subject: user.id_usr.toString(),
          issuer: 'login',
          audience: 'users',
        },
      ),
    };
  }

  verifyToken(token: string) {
    try {
      const data = this.Jwtservice.verify(token, {
        audience: 'users',
        issuer: 'login',
      });
      return data;
    } catch (e) {
      throw new BadRequestException(e);
    }
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

    return this.createToken(user);
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
    const user = await this.prisma.user.update({
      where: {
        id_usr: id,
      },
      data: {
        password_usr: newPassword,
      },
    });

    return this.createToken(user);
  }

  async register(data: AuthRegisterDTO) {
    const user = await this.UserService.create(data);

    return this.createToken(user);
  }
}
