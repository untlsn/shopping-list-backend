import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../orm/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getPage(page = 1, take = 10) {
    const [result, count] = await this.usersRepository.findAndCount({
      take,
      skip: page - 1,
    });

    return { result, count };
  }

  async create(email: string, password: string) {
    const hashPassword = await bcrypt.hash(password, 10);

    const result = await this.usersRepository.insert({
      email,
      password: hashPassword,
    });

    return result.generatedMaps;
  }

  getByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async validate(email: string, password: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({
      where: { email },
      select: ['id', 'password'],
    });
    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);

    return isValid ? user : null;
  }
}
