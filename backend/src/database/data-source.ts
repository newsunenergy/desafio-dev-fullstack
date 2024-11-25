import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'user', // Substitua pelo seu usuário do PostgreSQL
  password: 'password', // Substitua pela sua senha do PostgreSQL
  database: 'simulacao', // Nome do banco criado
  synchronize: true, // True para criar tabelas automaticamente (apenas para dev)
  logging: false,
  entities: ['src/entities/*.ts'], // Diretório das entidades
  migrations: [],
  subscribers: [],
});
