import { User } from '../../domain/entities/User';
import { IUserRepository } from '../../domain/repositories/user.repository';
import { UserRepository } from '../../infrastructure/persistence/user.repository';
import { EncryptionService } from '../../infrastructure/services/encryption.service';
import { HttpError } from '../../utils/httpError';
import { InternalServerError } from '../../utils/internalServerError';
import { CreateUserDto } from '../dtos/requests/create-user.dto';
import { UpdateUserDto } from '../dtos/requests/update-user.dto';
import { CreatedUserDto } from '../dtos/responses/created-user.dto';
import { IEncryptionService } from '../interfaces/encryption-service.interface';
import { IUserService } from '../interfaces/user-service.interface';
import { ErrorMessages } from './utils/errorMessages';

export class UserService implements IUserService {
  private readonly userRepository: IUserRepository;
  private readonly encryptionService: IEncryptionService;

  constructor() {
    this.userRepository = new UserRepository();
    this.encryptionService = new EncryptionService();
  }

  async createUser({ email, password }: CreateUserDto) {
    try {
      const isEmailAlreadyInUse = await this.userRepository.findOneBy(
        'email',
        email
      );

      if (isEmailAlreadyInUse)
        throw new HttpError(ErrorMessages.EMAIL_ALREADY_IN_USE, 409);

      const encryptedPassword = await this.encryptionService.hash(password);

      const user = new User(email, encryptedPassword);
      const createdUser = await this.userRepository.create(user);

      return {
        id: createdUser.id,
        email: createdUser.email
      } as CreatedUserDto;
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new InternalServerError();
    }
  }

  async getUserBy(criteria: string, value: string | number) {
    try {
      const foundUser = await this.userRepository.findOneBy(criteria, value);

      if (!foundUser) throw new HttpError(ErrorMessages.USER_NOT_FOUND, 404);

      return {
        id: foundUser.id,
        email: foundUser.email
      } as CreatedUserDto;
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new InternalServerError();
    }
  }

  async updateUser(user: UpdateUserDto): Promise<CreatedUserDto> {
    try {
      const foundUser = await this.userRepository.findOneBy('id', user.id);
      if (!foundUser) throw new HttpError(ErrorMessages.USER_NOT_FOUND, 404);

      if (user.email) foundUser.email = user.email;
      if (user.password) foundUser.password = user.password;

      const updatedUser = await this.userRepository.update(foundUser);

      return {
        id: updatedUser.id,
        email: updatedUser.email
      } as CreatedUserDto;
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new InternalServerError();
    }
  }
}
