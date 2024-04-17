import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../domain/entities/User';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User],
  synchronize: false,
  logging: false,
  migrations: ['./src/infrastructure/migrations/*.ts'],
  migrationsTableName: 'migrations'
});

export const initializeDb = () =>
  AppDataSource.initialize()
    .then(() => {
      console.log('Database connected');
    })
    .catch((error) => console.log(error));
