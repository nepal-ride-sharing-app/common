export type TargetEnvironment = 'development' | 'test' | 'production';

export type ServicePortsConfig = {
  riderServicePort: number;
  driverServicePort: number;
  matchingServicePort: number;
  notificationServicePort: number;
  googleMapsServicePort: number;
};

export type ServiceUrls = {
  riderServiceUrl: string;
  driverServiceUrl: string;
  matchingServiceUrl: string;
  notificationServiceUrl: string;
  googleMapsServiceUrl: string;
};

export type PublicConfig = ServicePortsConfig &
  ServiceUrls & {
    targetEnv: TargetEnvironment;
    appName: string;
    appShortName: string;
  };

export type AWSConfig = {
  awsRegion: string;
  awsAccessKeyId: string;
  awsSecretAccessKey: string;
};

export type MySQLConfig = {
  mysqlHost: string;
  mysqlUser: string;
  mysqlPassword: string;
  mysqlDatabase: string;
  mysqlPort: number;
};

export type RedisConfig = {
  redisHost: string;
  redisPort: number;
};

export type MongoDBConfig = {
  mongoHost: string;
  mongoPort: number;
};

export type KafkaConfig = {
  kafkaHost: string;
  kafkaPort: number;
  kafkaPortOutside: number;
  kafkaBroker: string;
  kafkaClientId: string;
  kafkaGroupId: string;
  kafkaTopic: string;
  kafkaSsl: boolean;
  kafkaSaslUsername: string;
  kafkaSaslPassword: string;
  kafkaSslCaCertPath: string;
  kafkaSslClientCertPath: string;
  kafkaSslClientKeyPath: string;
};

export type LocalstackConfig = {
  localstackPort: number;
  localstackLambdaPort: number;
};

export type PrivateConfig = AWSConfig &
  MySQLConfig &
  RedisConfig &
  MongoDBConfig &
  KafkaConfig &
  LocalstackConfig;

export type CommonEnvironmentConfig = PublicConfig & PrivateConfig;

export type ServiceEnvironmentConfig = CommonEnvironmentConfig;

export type MobileAppEnvironmentConfig = PublicConfig;
