import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    // guards run before interceptors so currentUser is not defined
    // to get currentUser we have to fetch it in a middleware

    // REQUEST => MIDDLEWARES => GUARDS => BEFORE INTERCEPTOR => CONTROLLER => AFTER INTERCEPTOR => RESPONSE
    if (!request.currentUser) {
      return false;
    }

    return request.currentUser.admin;
  }
}
