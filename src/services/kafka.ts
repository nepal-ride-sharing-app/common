import {
  Kafka,
  Producer,
  Consumer,
  EachMessagePayload,
  Partitioners,
  logLevel,
  KafkaConfig,
} from 'kafkajs';
import fs from 'fs';
import { isDevelopmentMode, isProductionMode } from '../utils/helpers';

export const isKafkaSSL = () => process.env.KAFKA_SSL === 'true';

export const isKafkaAuthenticationEnabled = () => isKafkaSSL();

export const isKafkaAuthorizationDisabled = () => !isKafkaSSL();

const createKafkaConfig = (): KafkaConfig => {
  const config: KafkaConfig = {
    clientId: process.env.KAFKA_CLIENT_ID || 'default-client-id',
    brokers: (process.env.KAFKA_BROKER || '').split(','),
    logLevel: logLevel.INFO,
  };

  if (isProductionMode() || isKafkaAuthenticationEnabled()) {
    config.ssl = {
      rejectUnauthorized: false,
      ca: [
        fs.readFileSync(
          process.env.KAFKA_SSL_CA_CERT_PATH ||
            '/etc/driver-service/certs/ca.crt',
          'utf-8',
        ),
      ],
      key: fs.readFileSync(
        process.env.KAFKA_SSL_CLIENT_KEY_PATH ||
          '/etc/driver-service/certs/client.key',
        'utf-8',
      ),
      cert: fs.readFileSync(
        process.env.KAFKA_SSL_CLIENT_CERT_PATH ||
          '/etc/driver-service/certs/client.crt',
        'utf-8',
      ),
    };
    config.sasl = {
      mechanism: 'scram-sha-512',
      username: process.env.KAFKA_SASL_USERNAME || 'user',
      password: process.env.KAFKA_SASL_PASSWORD || 'password',
    };
  }

  return config;
};

const createKafkaClient = (): Kafka => {
  const config = createKafkaConfig();
  return new Kafka(config);
};

const kafka = createKafkaClient();

const producer: Producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner,
});

const consumer: Consumer = kafka.consumer({
  groupId: process.env.KAFKA_GROUP_ID || 'default-group-id',
});

export const produceMessage = async (topic: string, message: string) => {
  await producer.connect();
  await producer.send({
    topic: topic || process.env.KAFKA_TOPIC || 'default-topic',
    messages: [{ value: message }],
  });
  await producer.disconnect();
};

export const consumeMessages = async (
  topic: string,
  eachMessage: (payload: EachMessagePayload) => Promise<void>,
) => {
  await consumer.connect();
  await consumer.subscribe({
    topic: topic || process.env.KAFKA_TOPIC || 'default-topic',
    fromBeginning: true,
  });
  await consumer.run({ eachMessage });
};

export const stopConsumer = async () => {
  await consumer.disconnect();
};

export {
  kafka,
  Producer,
  Consumer,
  EachMessagePayload,
  Partitioners,
  logLevel,
};
