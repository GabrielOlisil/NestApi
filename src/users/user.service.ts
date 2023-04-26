import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create.users.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePatchUserDTO } from './dto/update.patch.user.dto';
import { UpdatePutUserDTO } from './dto/update.put.user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ name, password, email }: CreateUserDTO) {
    return this.prisma.user.create({
      data: {
        email_usr: email,
        name_usr: name,
        password_usr: password,
      },
      select: {
        id_usr: true,
        createdAt: true,
      },
    });
  }

  async list() {
    return this.prisma.user.findMany();
  }

  async find(id: number) {
    await this.exists(id);

    return this.prisma.user.findUnique({
      where: {
        id_usr: id,
      },
    });
  }

  async update(
    id: number,
    { name, email, password, birthAt }: UpdatePutUserDTO,
  ) {
    await this.exists(id);

    if (!birthAt) {
      birthAt == null;
    }

    return this.prisma.user.update({
      data: {
        name_usr: name,
        password_usr: password,
        email_usr: email,
        birthAt_usr: birthAt ? new Date(birthAt) : null,
      },
      where: {
        id_usr: id,
      },
    });
  }

  async updatePartial(
    id: number,
    { name, email, password, birthAt }: UpdatePatchUserDTO,
  ) {
    await this.exists(id);

    const data: any = {};

    if (name) {
      data.name = name;
    }
    if (email) {
      data.email = email;
    }
    if (password) {
      data.password = password;
    }
    if (birthAt) {
      data.birthAt = new Date(birthAt);
    }

    return this.prisma.user.update({
      data: {
        name_usr: name,
        password_usr: password,
        email_usr: email,
      },
      where: {
        id_usr: id,
      },
    });
  }

  async delete(id: number) {
    await this.exists(id);

    return this.prisma.user.delete({
      where: {
        id_usr: id,
      },
    });
  }

  async exists(id: number) {
    if (
      !(await this.prisma.user.count({
        where: {
          id_usr: id,
        },
      }))
    ) {
      throw new NotFoundException(`O usuário de id: ${id} não existe`);
    }
  }
}
