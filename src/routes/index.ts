export * from './dbRoutes';
export * from './kafkaRoutes';
export * from './swaggerRoutes';
export * from './redisRoutes';
export * from './mongoRoutes';

import * as dbRoutes from './dbRoutes';
import * as kafkaRoutes from './kafkaRoutes';
import * as swaggerRoutes from './swaggerRoutes';
import * as redisRoutes from './redisRoutes';
import * as mongoRoutes from './mongoRoutes';

const routes = {
  dbRoutes,
  kafkaRoutes,
  swaggerRoutes,
  redisRoutes,
  mongoRoutes,
};

export default routes;
