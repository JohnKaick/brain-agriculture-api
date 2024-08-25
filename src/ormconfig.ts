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
  host: AGRICULTURE_DB_HOST || 'localhost',
  port: AGRICULTURE_DB_PORT || 5432,
  username: AGRICULTURE_DB_USER || 'jkapp',
  password: AGRICULTURE_DB_PASSWORD || '87654321',
  database: AGRICULTURE_DB_DATABASE || 'jkapp',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/database/migrations/*{.ts,.js}'],
  migrationsRun: true,
});
