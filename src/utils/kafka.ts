// filepath: /Users/Shared/CODING-SHARED/shared-library/src/utils/kafka.ts
import { Kafka, Producer, Consumer } from 'kafkajs';
import { KafkaConfig } from '../types';

export const createKafkaProducer = (config: KafkaConfig): Producer => {
  const kafka = new Kafka(config);
  return kafka.producer();
};

export const createKafkaConsumer = (
  config: KafkaConfig,
  groupId: string,
): Consumer => {
  const kafka = new Kafka(config);
  return kafka.consumer({ groupId });
};
