import { PublicConfig, PrivateConfig, AWSConfig, MySQLConfig, RedisConfig, MongoDBConfig, KafkaConfig, ServicePortsConfig, LocalstackConfig, TargetEnvironment, ServiceUrls } from "shared-common/types/Env";

const servicePortsConfig: ServicePortsConfig = {
  get riderServicePort() { return Number(process.env.RIDER_SERVICE_PORT) || 3001; },
  get driverServicePort() { return Number(process.env.DRIVER_SERVICE_PORT) || 3002; },
  get matchingServicePort() { return Number(process.env.MATCHING_SERVICE_PORT) || 3003; },
  get notificationServicePort() { return Number(process.env.NOTIFICATION_SERVICE_PORT) || 3004; },
  get googleMapsServicePort() { return Number(process.env.GOOGLE_MAPS_SERVICE_PORT) || 3005; },
};

const serviceUrls: ServiceUrls = {
  get riderServiceUrl() { return process.env.RIDER_SERVICE_URL || 'http://localhost:3001'; },
  get driverServiceUrl() { return process.env.DRIVER_SERVICE_URL || 'http://localhost:3002'; },
  get matchingServiceUrl() { return process.env.MATCHING_SERVICE_URL || 'http://localhost:3003'; },
  get notificationServiceUrl() { return process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:3004'; },
  get googleMapsServiceUrl() { return process.env.GOOGLE_MAPS_SERVICE_URL || 'http://localhost:3005'; },
};

const publicEnvs: PublicConfig = {
  get targetEnv() { return (process.env.TARGET_ENV as TargetEnvironment) || 'development'; },
  get serviceVersion() { return process.env.SERVICE_VERSION || '1.0.0'; },
  ...serviceUrls,
  ...servicePortsConfig,
};

const awsConfig: AWSConfig = {
  get awsRegion() { return process.env.AWS_REGION || 'us-east-1'; },
  get awsAccessKeyId() { return process.env.AWS_ACCESS_KEY_ID || 'test'; },
  get awsSecretAccessKey() { return process.env.AWS_SECRET_ACCESS_KEY || 'test'; },
};

const mySQLConfig: MySQLConfig = {
  get mysqlHost() { return process.env.MYSQL_HOST || 'mysql'; },
  get mysqlUser() { return process.env.MYSQL_USER || 'root'; },
  get mysqlPassword() { return process.env.MYSQL_PASSWORD || 'password'; },
  get mysqlDatabase() { return process.env.MYSQL_DATABASE || 'ride-sharing-app'; },
  get mysqlPort() { return Number(process.env.MYSQL_PORT) || 3308; },
};

const redisConfig: RedisConfig = {
  get redisHost() { return process.env.REDIS_HOST || 'redis'; },
  get redisPort() { return Number(process.env.REDIS_PORT) || 6379; },
};

const mongoDBConfig: MongoDBConfig = {
  get mongoHost() { return process.env.MONGO_HOST || 'mongo'; },
  get mongoPort() { return Number(process.env.MONGO_PORT) || 27017; },
};

const kafkaConfig: KafkaConfig = {
  get kafkaHost() { return process.env.KAFKA_HOST || 'redpanda'; },
  get kafkaPort() { return Number(process.env.KAFKA_PORT) || 29092; },
  get kafkaPortOutside() { return Number(process.env.KAFKA_PORT_OUTSIDE) || 9092; },
  get kafkaBroker() { return process.env.KAFKA_BROKER || 'redpanda:29092'; },
  get kafkaClientId() { return process.env.KAFKA_CLIENT_ID || 'driver-service'; },
  get kafkaGroupId() { return process.env.KAFKA_GROUP_ID || 'driver-service-group'; },
  get kafkaTopic() { return process.env.KAFKA_TOPIC || 'driver-service-topic'; },
  get kafkaSsl() { return process.env.KAFKA_SSL === 'true'; },
  get kafkaSaslUsername() { return process.env.KAFKA_SASL_USERNAME || 'user'; },
  get kafkaSaslPassword() { return process.env.KAFKA_SASL_PASSWORD || 'password'; },
  get kafkaSslCaCertPath() { return process.env.KAFKA_SSL_CA_CERT_PATH || 'certs/ca.crt'; },
  get kafkaSslClientCertPath() { return process.env.KAFKA_SSL_CLIENT_CERT_PATH || 'certs/client.crt'; },
  get kafkaSslClientKeyPath() { return process.env.KAFKA_SSL_CLIENT_KEY_PATH || 'certs/client.key'; },
};

const localstackConfig: LocalstackConfig = {
  get localstackPort() { return Number(process.env.LOCALSTACK_PORT) || 4566; },
  get localstackLambdaPort() { return Number(process.env.LOCALSTACK_LAMBDA_PORT) || 4571; },
};

const privateEnvs: PrivateConfig = {
  ...awsConfig,
  ...mySQLConfig,
  ...redisConfig,
  ...mongoDBConfig,
  ...kafkaConfig,
  ...localstackConfig,
};

const envs = { ...publicEnvs, ...privateEnvs };

export { envs, publicEnvs, privateEnvs };