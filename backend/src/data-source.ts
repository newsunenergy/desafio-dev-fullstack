import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Lead } from './leads/entities/lead.entity';
import { Unit } from './leads/entities/unit.entity';
import { Consumption } from './leads/entities/consumption.entity';

dotenv.config({ path: '.env.development' });

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: [Lead, Unit, Consumption],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
  logging: true,
});
