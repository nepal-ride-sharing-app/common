import {
  Kafka,
  Producer,
  Consumer,
  EachMessagePayload,
  Partitioners,
  logLevel,
  KafkaConfig,
} from 'kafkajs';
import { KafkaLibraryOptions } from 'shared/types/Kafka';

export const createKafkaService = (options: KafkaLibraryOptions) => {
  const { defaultTopic, groupId, ...config } = options;

  if (!config.clientId) {
    config.clientId = 'default-client-id';
  }
  if (!config.logLevel) {
    config.logLevel = logLevel.INFO;
  }

  const kafka = new Kafka(config);
  const producer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner,
  });
  const consumer = kafka.consumer({
    groupId: groupId || 'default-group-id',
  });
  const topic = defaultTopic || 'default-topic';

  const produceMessage = async (
    topicParam: string | undefined,
    message: string,
  ) => {
    await producer.connect();
    await producer.send({
      topic: topicParam || topic,
      messages: [{ value: message }],
    });
    await producer.disconnect();
  };

  const consumeMessages = async (
    topicParam: string | undefined,
    eachMessage: (payload: EachMessagePayload) => Promise<void>,
  ) => {
    await consumer.connect();
    await consumer.subscribe({
      topic: topicParam || topic,
      fromBeginning: true,
    });
    await consumer.run({ eachMessage });
  };

  const stopConsumer = async () => {
    await consumer.disconnect();
  };

  return {
    produceMessage,
    consumeMessages,
    stopConsumer,
  };
};
