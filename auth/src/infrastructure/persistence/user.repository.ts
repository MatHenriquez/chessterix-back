import { AppDataSource } from '../../config/orm.config';
import { User } from '../../domain/entities/User';

export class UserRepository {
  private readonly dataSourceManager =
    AppDataSource.getRepository(User).manager;

  async create(user: User) {
    const newUser = new User(user.email, user.password);

    return await this.dataSourceManager.save(newUser);
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
