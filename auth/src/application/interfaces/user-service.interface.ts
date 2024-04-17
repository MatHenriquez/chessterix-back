import { CreateUserDto } from '../dtos/requests/create-user.dto';
import { UpdateUserDto } from '../dtos/requests/update-user.dto';
import { CreatedUserDto } from '../dtos/responses/created-user.dto';

export interface IUserService {
  createUser(createUserDto: CreateUserDto): Promise<CreatedUserDto>;

  getUserBy(
    criteria: string,
    value: string | number
  ): Promise<CreatedUserDto | null>;

  updateUser(user: UpdateUserDto): Promise<CreatedUserDto>;
}
