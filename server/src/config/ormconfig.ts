import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Consumo } from 'src/consumo/entities/consumo.entity';
import { Lead } from 'src/lead/entities/lead.entity';
import { Unidade } from 'src/unidade/entities/unidade.entity';
const { DB_HOST, DB_PORT, DB_PASSWORD, DB_NAME, DB_USERNAME } = process.env;

export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: Number(DB_PORT),
  password: DB_PASSWORD,
  username: DB_USERNAME,
  entities: [Lead, Consumo, Unidade],
  database: DB_NAME,
  synchronize: true,
  logging: true,
  autoLoadEntities: true,
};
