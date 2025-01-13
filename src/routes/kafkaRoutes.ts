import { Router, Request, Response } from 'express';
import {
  produceMessage,
  consumeMessages,
  stopConsumer,
} from '../services/kafka';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Kafka
 *     description: Kafka operations
 */

/**
 * @swagger
 * /kafka/produce:
 *   post:
 *     summary: Produce a message to Kafka, The message will be appended with the current count
 *     tags: [Kafka]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               topic:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Message produced successfully
 *       500:
 *         description: Error producing message
 */
router.post('/produce', async (req: Request, res: Response) => {
  const { topic, message } = req.body;
  try {
    const result = await produceMessage(topic as string, message as string);
    res
      .status(200)
      .send(`Message produced successfully topic ${topic} message ${message}`);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).send(`Error producing message: ${errorMessage}`);
  }
});

/**
 * @swagger
 * /kafka/consume:
 *   get:
 *     summary: Consume messages from Kafka
 *     tags: [Kafka]
 *     parameters:
 *       - in: query
 *         name: topic
 *         schema:
 *           type: string
 *         required: true
 *         description: The topic to consume messages from
 *     responses:
 *       200:
 *         description: Consuming messages...
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Consuming messages...
 *                 messages:
 *                   type: array
 *                   items:
 *                         type: string
 *                         example: "Message content"
 *       500:
 *         description: Error consuming messages
 */
router.get('/consume', async (req: Request, res: Response) => {
  const { topic } = req.query;
  try {
    let messages: string[] = [];
    const timeout = 1000; // Set a timeout for the consumption process (e.g., 5 seconds)
    const startTime = Date.now();

    await consumeMessages(topic as string, async (message) => {
      const messageValue = message.message.value
        ? message.message.value.toString()
        : 'null';
      messages.push(messageValue);

      // Stop consuming messages after the timeout
      if (Date.now() - startTime > timeout) {
        stopConsumer();
        res.status(200).send({ status: 'Consuming messages...', messages });
      }
    });

    // Send the messages if the timeout is reached
    setTimeout(() => {
      stopConsumer();
      res.status(200).send({ status: 'Consuming messages...', messages });
    }, timeout);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).send(`Error consuming messages: ${errorMessage}`);
  }
});

export default router;
