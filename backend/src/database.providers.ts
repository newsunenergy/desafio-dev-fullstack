import { DataSource } from 'typeorm';
import { Lead } from './leads/entities/lead.entity';
import { Unit } from './leads/entities/unit.entity';
import { Consumption } from './leads/entities/consumption.entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.MYSQL_HOST,
        port: parseInt(process.env.MYSQL_PORT || '3306'),
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        entities: [Lead, Unit, Consumption],
        synchronize: false,
        logging: true,
      });

      return dataSource.initialize();
    },
  },
];

export const leadProviders = [
  {
    provide: 'LEAD_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Lead),
    inject: ['DATA_SOURCE'],
  },
];

export const unitProviders = [
  {
    provide: 'UNIT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Unit),
    inject: ['DATA_SOURCE'],
  },
];

export const consumptionProviders = [
  {
    provide: 'CONSUMPTION_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Consumption),
    inject: ['DATA_SOURCE'],
  },
];
