import { IEncryptionService } from '../../application/interfaces/encryption-service.interface';
import bcrypt from 'bcryptjs';

export class EncryptionService implements IEncryptionService {
  async hash(data: string): Promise<string> {
    return bcrypt.hash(data, 10); 
  }

  async compare(data: string, encrypted: string): Promise<boolean> {
    return bcrypt.compare(data, encrypted);
  }
}
