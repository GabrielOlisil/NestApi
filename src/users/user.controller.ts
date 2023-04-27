import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { log } from 'console';
import { ParamId } from 'src/decorators/param.id.decorator';
import { CreateUserDTO } from './dto/create.users.dto';
import { UpdatePatchUserDTO } from './dto/update.patch.user.dto';
import { UpdatePutUserDTO } from './dto/update.put.user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() user: CreateUserDTO) {
    return this.userService.create(user);
  }

  @Get()
  getUsers() {
    return this.userService.list();
  }

  @Get(':id')
  async readOne(@ParamId() id: number) {
    log(id);
    return this.userService.find(id);
  }

  @Put(':id')
  async update(@Body() data: UpdatePutUserDTO, @ParamId() id: number) {
    return this.userService.update(id, data);
  }

  @Patch(':id')
  async updatePartial(@Body() data: UpdatePatchUserDTO, @ParamId() id: number) {
    return this.userService.updatePartial(id, data);
  }

  @Delete(':id')
  async deleteUser(@ParamId() id: number) {
    return this.userService.delete(id);
  }
}
