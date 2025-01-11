// filepath: /Users/Shared/CODING-SHARED/shared-library/src/types/index.ts
export interface KafkaConfig {
  clientId: string;
  brokers: string[];
  ssl?: boolean;
  sasl?: {
    mechanism: 'plain';
    username: string;
    password: string;
  };
}

export interface MySQLConfig {
  host: string;
  user: string;
  password: string;
  database: string;
  port?: number;
}

export interface RedisConfig {
  host: string;
  port: number;
  password?: string;
  db?: number;
}
