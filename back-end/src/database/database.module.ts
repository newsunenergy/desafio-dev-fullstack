import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consumption } from 'src/lead/entities/consumption.entity';
import { Lead } from 'src/lead/entities/lead.entity';
import { Unit } from 'src/lead/entities/unit.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123',
      database: 'my-db',
      entities: [Lead, Unit, Consumption],
      synchronize: true,
    }),
  ],
})

export class DatabaseModule { }
