import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Lead } from 'src/leads/entities/lead.entity';
import { Unit } from 'src/leads/entities/unit.entity';

dotenv.config({ path: '.env.development' });

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: [Lead, Unit],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
  logging: true,
});

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
      }
      return AppDataSource;
    },
  },
];

export const leadProviders = [
  {
    provide: 'LEAD_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Lead),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'UNIT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Unit),
    inject: ['DATA_SOURCE'],
  },
];
