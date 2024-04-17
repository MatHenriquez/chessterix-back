import { User } from '../entities/User';

export interface IUserRepository {
  create(user: User): Promise<User>;
  findOneBy(criteria: string, value: string | number): Promise<User | null>;
  update(user: User): Promise<User>;
}
