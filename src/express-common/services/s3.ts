import AWS from 'aws-sdk';
import logger from './logger';
import { isDevelopmentMode } from '../../shared-common/utils/helpers';

const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  endpoint: process.env.AWS_ENDPOINT,
  s3ForcePathStyle: isDevelopmentMode(), // Needed for localstack in development mode
});

export const bucketName = process.env.AWS_S3_BUCKET || 'ride-sharing-app';

/**
 * Uploads an object to the specified S3 bucket.
 *
 * @param {string} key - The key for the object.
 * @param {Buffer | Uint8Array | Blob | string} body - The content of the object.
 * @returns {Promise<AWS.S3.PutObjectOutput>} - A promise that resolves to the result of the upload operation.
 */
export const uploadObject = async (
  key: string,
  body: Buffer | Uint8Array | Blob | string,
): Promise<AWS.S3.PutObjectOutput> => {
  try {
    const params = {
      Bucket: bucketName,
      Key: key,
      Body: body,
    };
    const result = await s3.putObject(params).promise();
    logger.info(`Object uploaded to bucket ${bucketName} with key ${key}`);
    return result;
  } catch (error) {
    logger.error('Error uploading object to S3:', error);
    throw error;
  }
};

/**
 * Downloads an object from the specified S3 bucket.
 *
 * @param {string} key - The key for the object.
 * @returns {Promise<AWS.S3.GetObjectOutput>} - A promise that resolves to the content of the object.
 */
export const downloadObject = async (
  key: string,
): Promise<AWS.S3.GetObjectOutput> => {
  try {
    const params = {
      Bucket: bucketName,
      Key: key,
    };
    const result = await s3.getObject(params).promise();
    logger.info(`Object downloaded from bucket ${bucketName} with key ${key}`);
    return result;
  } catch (error) {
    logger.error('Error downloading object from S3:', error);
    throw error;
  }
};

/**
 * Deletes an object from the specified S3 bucket.
 *
 * @param {string} key - The key for the object.
 * @returns {Promise<AWS.S3.DeleteObjectOutput>} - A promise that resolves to the result of the delete operation.
 */
export const deleteObject = async (
  key: string,
): Promise<AWS.S3.DeleteObjectOutput> => {
  try {
    const params = {
      Bucket: bucketName,
      Key: key,
    };
    const result = await s3.deleteObject(params).promise();
    logger.info(`Object deleted from bucket ${bucketName} with key ${key}`);
    return result;
  } catch (error) {
    logger.error('Error deleting object from S3:', error);
    throw error;
  }
};

/**
 * Lists objects in the specified S3 bucket.
 *
 * @returns {Promise<AWS.S3.ListObjectsV2Output>} - A promise that resolves to the list of objects in the bucket.
 */
export const listObjects = async (): Promise<AWS.S3.ListObjectsV2Output> => {
  try {
    const params = {
      Bucket: bucketName,
    };
    const result = await s3.listObjectsV2(params).promise();
    logger.info(`Objects listed in bucket ${bucketName}`);
    return result;
  } catch (error) {
    logger.error('Error listing objects in S3:', error);
    throw error;
  }
};
