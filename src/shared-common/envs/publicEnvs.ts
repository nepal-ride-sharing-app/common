import {
  PublicConfig,
  ServicePortsConfig,
  ServiceUrls,
  TargetEnvironment,
} from '../types/Env';

const servicePortsConfig: ServicePortsConfig = {
  get riderServicePort() {
    return Number(process.env.RIDER_SERVICE_PORT) || 3001;
  },
  get driverServicePort() {
    return Number(process.env.DRIVER_SERVICE_PORT) || 3002;
  },
  get matchingServicePort() {
    return Number(process.env.MATCHING_SERVICE_PORT) || 3003;
  },
  get notificationServicePort() {
    return Number(process.env.NOTIFICATION_SERVICE_PORT) || 3004;
  },
  get googleMapsServicePort() {
    return Number(process.env.GOOGLE_MAPS_SERVICE_PORT) || 3005;
  },
};

const serviceUrls: ServiceUrls = {
  get riderServiceUrl() {
    return process.env.RIDER_SERVICE_URL || 'http://localhost:3001';
  },
  get driverServiceUrl() {
    return process.env.DRIVER_SERVICE_URL || 'http://localhost:3002';
  },
  get matchingServiceUrl() {
    return process.env.MATCHING_SERVICE_URL || 'http://localhost:3003';
  },
  get notificationServiceUrl() {
    return process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:3004';
  },
  get googleMapsServiceUrl() {
    return process.env.GOOGLE_MAPS_SERVICE_URL || 'http://localhost:3005';
  },
};

const publicEnvs: PublicConfig = {
  get targetEnv() {
    return (process.env.TARGET_ENV as TargetEnvironment) || 'development';
  },
  get appName() {
    return process.env.APP_NAME || 'Nepal Ride Sharing App';
  },
  get appShortName() {
    return process.env.APP_SHORT_NAME || 'NRSA';
  },
  ...serviceUrls,
  ...servicePortsConfig,
};

export default publicEnvs;
export { serviceUrls, servicePortsConfig };
