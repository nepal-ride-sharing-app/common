import mysql, { Connection, ConnectionOptions } from 'mysql2/promise';
import log from './logger'; // Assuming you have a log utility

// MySQL configuration
const mysqlConfig: ConnectionOptions = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT || '3306', 10),
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
  database: process.env.MYSQL_DATABASE || 'ride-sharing-app',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

let connection: Connection | null = null;

/**
 * Initializes the MySQL connection if it hasn't been initialized yet.
 *
 * @returns {Promise<Connection>} - A promise that resolves to the MySQL connection.
 * @throws {Error} - Throws an error if the connection initialization fails.
 */
export const initializeConnection = async (): Promise<Connection> => {
  if (!connection) {
    try {
      connection = await mysql.createConnection(mysqlConfig);
      log.info('MySQL connection established');
    } catch (error) {
      log.error('Error creating MySQL connection: ' + JSON.stringify(error));
      throw error;
    }
  }
  return connection;
};

/**
 * Executes a SQL query using the MySQL connection.
 *
 * @param {string} query - The SQL query to be executed.
 * @param {any[]} [params=[]] - An array of parameters to be passed to the query.
 * @returns {Promise<any>} - A promise that resolves to the results of the query.
 * @throws {Error} - Throws an error if the query execution fails.
 */
export const executeQuery = async (
  query: string,
  params: any[] = [],
): Promise<any> => {
  const conn = await initializeConnection();
  try {
    const [results] = await conn.execute(query, params);
    return results;
  } catch (error) {
    log.error('Error executing query: ' + JSON.stringify(error));
    throw error;
  }
};
