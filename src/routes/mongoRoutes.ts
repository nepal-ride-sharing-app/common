import { Router, Request, Response } from 'express';
import { connectToMongo, executeOperation } from '../services/mongo';
import { ObjectId } from 'mongodb';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: MongoDB
 *     description: MongoDB operations
 */


/**
 * @swagger
 * /mongo/create:
 *   post:
 *     summary: Create a new document
 *     tags: [MongoDB]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example: { "name": "John Doe", "email": "john.doe@example.com" }
 *     responses:
 *       201:
 *         description: Document created successfully
 *       500:
 *         description: Internal server error
 */
router.post('/create', async (req: Request, res: Response) => {
  try {
    const result = await executeOperation('items', async (collection) => {
      return await collection.insertOne(req.body);
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

/**
 * @swagger
 * /mongo/read:
 *   get:
 *     summary: Read documents
 *     tags: [MongoDB]
 *     responses:
 *       200:
 *         description: List of documents
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Internal server error
 */
router.get('/read', async (req: Request, res: Response) => {
  try {
    const result = await executeOperation('items', async (collection) => {
      return await collection.find().toArray();
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

/**
 * @swagger
 * /mongo/update/{id}:
 *   put:
 *     summary: Update a document
 *     tags: [MongoDB]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The document ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example: { "name": "Jane Doe", "email": "jane.doe@example.com" }
 *     responses:
 *       200:
 *         description: Document updated successfully
 *       500:
 *         description: Internal server error
 */
router.put('/update/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await executeOperation('items', async (collection) => {
      return await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: req.body },
      );
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

/**
 * @swagger
 * /mongo/delete/{id}:
 *   delete:
 *     summary: Delete a document
 *     tags: [MongoDB]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The document ID
 *     responses:
 *       200:
 *         description: Document deleted successfully
 *       500:
 *         description: Internal server error
 */
router.delete('/delete/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await executeOperation('items', async (collection) => {
      return await collection.deleteOne({ _id: new ObjectId(id) });
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;