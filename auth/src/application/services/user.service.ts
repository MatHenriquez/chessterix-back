import { User } from '../../domain/entities/User';
import { UserRepository } from '../../infrastructure/persistence/user.repository';

export class UserService {
  private readonly userRepository = new UserRepository();

  async createUser(email: string, password: string): Promise<User> {
    const user = new User(email, password);
    return await this.userRepository.create(user);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy('email', email);
  }

  async updateUser(user: User): Promise<User> {
    return await this.userRepository.update(user);
  }
}
