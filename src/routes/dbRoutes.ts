import { Router } from 'express';
import type { Request, Response } from 'express';
import { executeQuery } from '../services/db';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Database
 *     description: Database operations/ MySQL operations
 */

/**
 * @swagger
 * /db/query:
 *   get:
 *     summary: Execute a query and get the result
 *     tags: [Database]
 *     parameters:
 *       - in: query
 *         name: sqlQuery
 *         schema:
 *           type: string
 *         required: true
 *         description: The SQL query to be executed
 *     responses:
 *       200:
 *         description: Query executed successfully
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *       400:
 *         description: sqlQuery parameter is required
 *       500:
 *         description: Error executing query
 */
router.get('/query', async (req: Request, res: Response): Promise<any> => {
  const { sqlQuery } = req.query;
  if (!sqlQuery) {
    return res.status(400).send('sqlQuery parameter is required');
  }
  try {
    const results = await executeQuery(sqlQuery as string);
    res.status(200).send(`Query result: ${JSON.stringify(results)}`);
  } catch (error) {
    res.status(500).send(`Error executing query: ${(error as Error).message}`);
  }
});

export default router;
