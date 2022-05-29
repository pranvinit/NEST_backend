import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

describe('UsersController', () => {
  let controller: UsersController;

  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      find: (email: string) => {
        return Promise.resolve([{ id: 1, email, password: 'secret' } as User]);
      },
      findOne: (id: number) => {
        return Promise.resolve({
          id,
          email: 'pranav@gmail.com',
          password: 'secret',
        } as User);
      },
    };

    fakeAuthService = {
      // signup: () => {},
      signin: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password } as User);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          // when a instance of UsersService is required use the value of fakeUsersService instead
          provide: UsersService,
          useValue: fakeUsersService,
        },
        {
          // when a instance of AuthService is required use the value of fakeAuthService instead
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUsers should return a list of users with the given email', async () => {
    const users = await controller.findAllUsers('pranav@gmail.com');

    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('pranav@gmail.com');
  });

  it('signin should return a user and set an id on the session object', async () => {
    const session = { userId: null };
    const user = await controller.signin(
      { email: 'pranav@gmail.com', password: 'secret' },
      session,
    );
    // better than using toBeDefined()
    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });
});
