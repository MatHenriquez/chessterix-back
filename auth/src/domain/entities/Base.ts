import { Column, IntegerType, PrimaryGeneratedColumn } from 'typeorm';

export class Base {
  constructor() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.deletedAt = new Date();
  }

  @PrimaryGeneratedColumn()
  id!: IntegerType;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  deletedAt: Date;
}
