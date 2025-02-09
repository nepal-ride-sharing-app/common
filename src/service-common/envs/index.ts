import { ServiceEnvironmentConfig } from 'shared-common/types';
import privateEnvs from '../../shared-common/envs/privateEnvs';
import publicEnvs from '../../shared-common/envs/publicEnvs';

const serviceEnvs: ServiceEnvironmentConfig = { ...privateEnvs, ...publicEnvs };

export default serviceEnvs;