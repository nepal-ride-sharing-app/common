/**
 * Configuration for Kafka connection.
 */
export type KafkaConfig = {
  /** Client ID for the Kafka connection. */
  clientId: string;
  /** List of Kafka broker addresses. */
  brokers: string[];
  /** Enable SSL for the Kafka connection. */
  ssl?: boolean;
  /** SASL authentication configuration. */
  sasl?: {
    mechanism: 'plain';
    username: string;
    password: string;
  };
};

/**
 * Configuration for MySQL connection.
 */
export type MySQLConfig = {
  /** Hostname of the MySQL server. */
  host: string;
  /** Username for the MySQL connection. */
  user: string;
  /** Password for the MySQL connection. */
  password: string;
  /** Database name. */
  database: string;
  /** Port number for the MySQL connection. */
  port?: number;
};

/**
 * Configuration for Redis connection.
 */
export type RedisConfig = {
  /** Hostname of the Redis server. */
  host: string;
  /** Port number for the Redis connection. */
  port: number;
  /** Password for the Redis connection. */
  password?: string;
  /** Database index for the Redis connection. */
  db?: number;
};