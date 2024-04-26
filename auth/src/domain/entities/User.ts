import { Base } from './Base';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class User extends Base {
  constructor(email: string, password: string) {
    super();
    this.email = email;
    this.password = password;
  }

  @Column('varchar', { length: 30, unique: true })
  email: string;

  @Column('varchar')
  password: string;
}
