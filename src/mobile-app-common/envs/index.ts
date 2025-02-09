import { MobileAppEnvironmentConfig } from 'shared-common/types';
import publicEnvs from '../../shared-common/envs/publicEnvs';

const mobileAppEnvs: MobileAppEnvironmentConfig = {
  ...publicEnvs,
};

export default mobileAppEnvs;
