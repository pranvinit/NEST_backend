import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    // Create a fake copy of users service
    const users: User[] = [];
    fakeUsersService = {
      // returns a promise and immediately resolves it to the provided value
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.round(Math.random() * 999),
          email,
          password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        // if an instance of UsersService is to be provided, use the value of fakeUsersService instead
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  // Sign up tests

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('can create a new user with a salted and hashed password', async () => {
    const user = await service.signup('pranav@gmail.com', 'secret');

    expect(user.password).not.toEqual('secret');
    const [salt, hash] = user.password.split('.');

    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user sign ups with an email that is already in use', async () => {
    await service.signup('pranav@gmail.com', 'secret');

    // new jest syntax
    await expect(service.signup('pranav@gmail.com', 'secret')).rejects.toThrow(
      BadRequestException,
    );
  });

  // Sign in tests
  it('throws an error if signin is called with an unused email', async () => {
    await expect(service.signin('unused@gmail.com', 'secret')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('returns a user if correct password is provided', async () => {
    await service.signup('om@gmail.com', 'secret');

    const user = await service.signin('om@gmail.com', 'secret');
    expect(user).toBeDefined();
  });
});
