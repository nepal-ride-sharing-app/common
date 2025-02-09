import { CommonEnvironmentConfig } from 'shared-common/types';
import privateEnvs from './privateEnvs';
import publicEnvs from './publicEnvs';

const envs: CommonEnvironmentConfig = {
  ...privateEnvs,
  ...publicEnvs,
};

export default envs;
