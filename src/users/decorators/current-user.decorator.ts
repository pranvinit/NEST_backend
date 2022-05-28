import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  // context is the incoming request object (for HTTP requests)
  (data: never, context: ExecutionContext) => {
    // return value will be the value of currentUser() decorator
    const request = context.switchToHttp().getRequest();

    return request.currentUser;
  },
);
