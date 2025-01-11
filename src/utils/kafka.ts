import { Kafka, Producer, Consumer } from 'kafkajs';
import { KafkaConfig } from '../types';

/**
 * Creates a Kafka producer.
 * @param {KafkaConfig} config - Configuration for the Kafka connection.
 * @returns {Producer} Kafka producer instance.
 */
export const createKafkaProducer = (config: KafkaConfig): Producer => {
  const kafka = new Kafka(config);
  return kafka.producer();
};

/**
 * Creates a Kafka consumer.
 * @param {KafkaConfig} config - Configuration for the Kafka connection.
 * @param {string} groupId - Consumer group ID.
 * @returns {Consumer} Kafka consumer instance.
 */
export const createKafkaConsumer = (config: KafkaConfig, groupId: string): Consumer => {
  const kafka = new Kafka(config);
  return kafka.consumer({ groupId });
};