import { Router, Request, Response } from 'express';
import { setValue, getValue, deleteKey } from '../services/redis';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Redis
 *     description: Redis operations
 */

/**
 * @swagger
 * /redis/set:
 *   get:
 *     summary: Set a value in Redis
 *     tags: [Redis]
 *     responses:
 *       200:
 *         description: Value set successfully
 *       500:
 *         description: Error setting value
 */
router.get('/set', async (req: Request, res: Response) => {
  try {
    await setValue('exampleKey', 'exampleValue');
    res.status(200).send('Value set successfully');
  } catch (error) {
    res.status(500).send(`Error setting value: ${(error as Error).message}`);
  }
});

/**
 * @swagger
 * /redis/get:
 *   get:
 *     summary: Get a value from Redis
 *     tags: [Redis]
 *     responses:
 *       200:
 *         description: Value retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "exampleValue"
 *       500:
 *         description: Error getting value
 */
router.get('/get', async (req: Request, res: Response) => {
  try {
    const value = await getValue('exampleKey');
    res.status(200).send(`Value: ${value}`);
  } catch (error) {
    res.status(500).send(`Error getting value: ${(error as Error).message}`);
  }
});

/**
 * @swagger
 * /redis/delete:
 *   get:
 *     summary: Delete a key from Redis
 *     tags: [Redis]
 *     responses:
 *       200:
 *         description: Key deleted successfully
 *       500:
 *         description: Error deleting key
 */
router.get('/delete', async (req: Request, res: Response) => {
  try {
    await deleteKey('exampleKey');
    res.status(200).send('Key deleted successfully');
  } catch (error) {
    res.status(500).send(`Error deleting key: ${(error as Error).message}`);
  }
});

export default router;
