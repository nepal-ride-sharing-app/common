import { MongoClient, Db, Collection, Document, ObjectId } from 'mongodb';
import logger from './logger'; // Assuming you have a logger utility

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017';
const dbName = process.env.MONGO_DB_NAME || 'ride-sharing-app';

let client: MongoClient | null = null;
let db: Db | null = null;

/**
 * Connects to the MongoDB database if not already connected.
 *
 * @returns {Promise<Db>} - A promise that resolves to the MongoDB database instance.
 */
export const connectToMongo = async (): Promise<Db> => {
  if (!client) {
    try {
      client = new MongoClient(mongoUri);
      await client.connect();
      db = client.db(dbName);
      logger.info('Connected to MongoDB');
    } catch (error) {
      logger.error('Error connecting to MongoDB: ' + JSON.stringify(error));
      throw error;
    }
  }
  return db!;
};

/**
 * Executes a MongoDB operation.
 *
 * @param {string} collectionName - The name of the collection.
 * @param {(collection: Collection<Document>) => Promise<any>} operation - The operation to be executed.
 * @returns {Promise<any>} - A promise that resolves to the result of the operation.
 */
export const executeOperation = async (
  collectionName: string,
  operation: (collection: Collection<Document>) => Promise<any>,
): Promise<any> => {
  const db = await connectToMongo();
  const collection = db.collection(collectionName);
  try {
    const result = await operation(collection);
    return result;
  } catch (error) {
    logger.error('Error executing MongoDB operation: ' + JSON.stringify(error));
    throw error;
  }
};

/**
 * Closes the MongoDB connection.
 *
 * @returns {Promise<void>} - A promise that resolves when the connection is closed.
 */
export const closeMongoConnection = async (): Promise<void> => {
  if (client) {
    await client.close();
    client = null;
    db = null;
    logger.info('MongoDB connection closed');
  }
};

/**
 * Creates a new document in the specified collection.
 *
 * @param {string} collectionName - The name of the collection.
 * @param {Document} document - The document to be created.
 * @returns {Promise<any>} - A promise that resolves to the result of the insert operation.
 */
export const createDocument = async (
  collectionName: string,
  document: Document,
): Promise<any> => {
  return executeOperation(collectionName, async (collection) => {
    const result = await collection.insertOne(document);
    return { _id: result.insertedId, ...document };
  });
};

/**
 * Reads documents from the specified collection.
 *
 * @param {string} collectionName - The name of the collection.
 * @param {Document} query - The query to filter documents.
 * @returns {Promise<any[]>} - A promise that resolves to the array of documents.
 */
export const readDocuments = async (
  collectionName: string,
  query: Document = {},
): Promise<any[]> => {
  return executeOperation(collectionName, async (collection) => {
    const result = await collection.find(query).toArray();
    return result;
  });
};

/**
 * Updates documents in the specified collection.
 *
 * @param {string} collectionName - The name of the collection.
 * @param {Document} query - The query to filter documents.
 * @param {Document} update - The update operations to be applied.
 * @returns {Promise<any>} - A promise that resolves to the result of the update operation.
 */
export const updateDocuments = async (
  collectionName: string,
  query: Document,
  update: Document,
): Promise<any> => {
  return executeOperation(collectionName, async (collection) => {
    const result = await collection.updateMany(query, update);
    return result;
  });
};

/**
 * Deletes documents from the specified collection.
 *
 * @param {string} collectionName - The name of the collection.
 * @param {Document} query - The query to filter documents.
 * @returns {Promise<any>} - A promise that resolves to the result of the delete operation.
 */
export const deleteDocuments = async (
  collectionName: string,
  query: Document,
): Promise<any> => {
  return executeOperation(collectionName, async (collection) => {
    const result = await collection.deleteMany(query);
    return result;
  });
};
