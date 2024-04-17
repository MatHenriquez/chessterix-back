import { AppDataSource } from '../../config/orm.config';
import { User } from '../../domain/entities/User';
import { IUserRepository } from '../../domain/repositories/user.repository';

export class UserRepository implements IUserRepository {
  private readonly dataSourceManager =
    AppDataSource.getRepository(User).manager;

  async create(user: User) {
    return await this.dataSourceManager.save(user);
  }

  async findOneBy(criteria: string, value: string | number) {
    return this.dataSourceManager.findOne(User, {
      where: { [criteria]: value }
    });
  }

  async update(user: User) {
    return await this.dataSourceManager.save(user);
  }
}
