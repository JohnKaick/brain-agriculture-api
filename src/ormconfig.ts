import { DataSource } from 'typeorm';
import {
  AGRICULTURE_DB_HOST,
  AGRICULTURE_DB_PORT,
  AGRICULTURE_DB_USER,
  AGRICULTURE_DB_PASSWORD,
  AGRICULTURE_DB_DATABASE,
} from './constants';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: AGRICULTURE_DB_HOST,
  port: AGRICULTURE_DB_PORT,
  username: AGRICULTURE_DB_USER,
  password: AGRICULTURE_DB_PASSWORD,
  database: AGRICULTURE_DB_DATABASE,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/database/migrations/*{.ts,.js}'],
  migrationsRun: false,
  ssl: {
    rejectUnauthorized: false,
  },
});
