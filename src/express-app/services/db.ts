import mysql, { Connection, ConnectionOptions } from 'mysql2/promise';
import log from './logger'; // Assuming you have a log utility

let connection: Connection | null = null;
let defaultConfig: ConnectionOptions | null = null;

/**
 * Sets the default MySQL connection configuration.
 *
 * @param {ConnectionOptions} config - The MySQL connection configuration.
 */
export const setDefaultConfig = (config: ConnectionOptions): void => {
  defaultConfig = config;
};

/**
 * Initializes the MySQL connection if it hasn't been initialized yet.
 *
 * @param {ConnectionOptions} config - The MySQL connection configuration.
 * @returns {Promise<Connection>} - A promise that resolves to the MySQL connection.
 * @throws {Error} - Throws an error if the connection initialization fails.
 */
export const initializeConnection = async (
  config: ConnectionOptions,
): Promise<Connection> => {
  if (!connection) {
    try {
      connection = await mysql.createConnection(config);
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
 * @param {ConnectionOptions} [config] - The MySQL connection configuration.
 * @returns {Promise<any>} - A promise that resolves to the results of the query.
 * @throws {Error} - Throws an error if the query execution fails or if the config is not set.
 */
export const executeQuery = async (
  query: string,
  params: any[] = [],
  config?: ConnectionOptions,
): Promise<any> => {
  const connConfig = config || defaultConfig;
  if (!connConfig) {
    throw new Error(
      'MySQL configuration not set. Please set the configuration using setDefaultConfig or pass it to executeQuery.',
    );
  }
  const conn = await initializeConnection(connConfig);
  try {
    const [results] = await conn.execute(query, params);
    return results;
  } catch (error) {
    log.error('Error executing query: ' + JSON.stringify(error));
    throw error;
  }
};
