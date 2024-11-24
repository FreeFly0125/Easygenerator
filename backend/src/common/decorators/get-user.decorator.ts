import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../users/schemas/user.schema';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    if (data) {
      return user[data];
    }
    return user;
  },
);
