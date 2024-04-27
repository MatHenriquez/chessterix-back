import jwt from 'jsonwebtoken';
import { CreatedUserDto } from '../../application/dtos/responses/created-user.dto';
import { InternalServerError } from '../../utils/internalServerError';
import { IJwtService } from '../../application/interfaces/jwt-service.interface';

export class JwtService implements IJwtService {
  private readonly secret: string = process.env.JWT_SECRET || '';

  createToken(user: CreatedUserDto): string {
    this.checkIfSecretExists();

    return jwt.sign(
      {
        id: user.id,
        data: user.email
      },
      this.secret,
      { expiresIn: '7d' }
    );
  }

  private readonly checkIfSecretExists = (): void => {
    if (!this.secret) throw new InternalServerError();
  };
}
