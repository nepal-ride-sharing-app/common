import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../configs/swaggerSpec';

const router = Router();

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default router;
