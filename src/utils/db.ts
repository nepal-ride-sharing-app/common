// filepath: /Users/Shared/CODING-SHARED/shared-library/src/utils/db.ts
import mysql from 'mysql2/promise';
import { MySQLConfig } from '../types';

export const createMySQLConnection = async (config: MySQLConfig) => {
  const connection = await mysql.createConnection(config);
  return connection;
};
