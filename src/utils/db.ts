import mysql from 'mysql2/promise';
import { MySQLConfig } from '../types';

/**
 * Creates a MySQL connection.
 * @param {MySQLConfig} config - Configuration for the MySQL connection.
 * @returns {Promise<mysql.Connection>} MySQL connection instance.
 */
export const createMySQLConnection = async (config: MySQLConfig): Promise<mysql.Connection> => {
  const connection = await mysql.createConnection(config);
  return connection;
};