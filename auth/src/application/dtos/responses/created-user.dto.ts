export class CreatedUserDto {
  constructor(id: number, email: string) {
    this.id = id;
    this.email = email;
  }

  id: number;

  email: string;
}
