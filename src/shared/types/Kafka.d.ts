export type KafkaLibraryOptions = KafkaConfig & {
  defaultTopic?: string;
  groupId?: string;
};
