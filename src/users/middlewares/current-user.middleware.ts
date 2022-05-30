import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { User } from '../entities/user.entity';

import { UsersService } from '../users.service';

declare global {
  namespace Express {
    // adds an additional optional currentUser property on Request object
    interface Request {
      currentUser: User;
    }
  }
}

// makes it part of the DI system
// allows access to other DI class instances (UsersService in this case)
@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  async use(req: Request, res: Request, next: NextFunction) {
    const { userId } = req.session || {};
    if (userId) {
      const user = await this.usersService.findOne(userId);
      //@ts-ignore
      req.currentUser = user;
    }
    return next();
  }
}
