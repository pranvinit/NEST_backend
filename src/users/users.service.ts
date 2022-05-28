import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });

    return this.repo.save(user);
  }

  async findOne(id: number) {
    if (!id) {
      return null;
    }
    const user = await this.repo.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  async find(email: string) {
    return await this.repo.find({ email });
  }

  // insert(), update() and delete() methods will not trigger the entity hooks
  // so we first fetch the record and assign properties manually
  // save() and remove() methods will trigger the entity hooks

  // attrs can have none or any properties of the User entity
  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    // user.email = attrs.email;
    // user.password = attrs.password;
    Object.assign(user, attrs); // does the same thing

    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.repo.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return this.repo.remove(user);
  }
}
