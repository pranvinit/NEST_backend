import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session;

    // Only calls the next handler if userId is truthy otherwise throws an exception
    return userId;
  }
}
