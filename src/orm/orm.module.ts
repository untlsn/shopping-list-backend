import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { User } from './user.entity';

dotenv.config();

export const OrmModule = TypeOrmModule.forRoot({
  type: process.env.DATABASE_TYPE as any,
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  entities: [User],
  synchronize: process.env.DATABASE_SYNCHRONIZE == 'true',
});
