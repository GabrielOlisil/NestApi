import {
  ExecutionContext,
  NotFoundException,
  createParamDecorator,
} from '@nestjs/common';
import { log } from 'console';

export const User = createParamDecorator(
  (_data: string, context: ExecutionContext) => {
    const { user, tokenPayload } = context.switchToHttp().getRequest();

    if (user) {
      if (_data) {
        log(user[_data]);
        return user[_data];
      }
      return { user, tokenPayload };
    }
    throw new NotFoundException('User not found, AuthGuard required');
  },
);
