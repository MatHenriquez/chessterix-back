import { CreatedUserDto } from '../dtos/responses/created-user.dto';

export interface IJwtService {
  createToken(user: CreatedUserDto): string;
}
