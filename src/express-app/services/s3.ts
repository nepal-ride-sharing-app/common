import AWS from 'aws-sdk';
import logger from './logger';

let s3: AWS.S3 | undefined;

let bucketName = 'ride-sharing-app';

/**
 * Initializes the S3 client with the required parameters.
 */
export const initializeS3 = (config: AWS.S3.ClientConfiguration): void => {
  s3 = new AWS.S3(config);
  logger.info('S3 has been initialized');
};

const checkS3 = (): void => {
  if (!s3) {
    throw new Error('s3 is not initialized');
  }
};

/**
 * Uploads an object to the specified S3 bucket.
 */
export const uploadObject = async (
  key: string,
  body: Buffer | Uint8Array | Blob | string,
): Promise<AWS.S3.PutObjectOutput> => {
  checkS3();
  try {
    const params = {
      Bucket: bucketName,
      Key: key,
      Body: body,
    };
    const result = await s3!.putObject(params).promise();
    logger.info(`Object uploaded to bucket ${bucketName} with key ${key}`);
    return result;
  } catch (error) {
    logger.error('Error uploading object to S3:', error);
    throw error;
  }
};

/**
 * Downloads an object from the specified S3 bucket.
 */
export const downloadObject = async (
  key: string,
): Promise<AWS.S3.GetObjectOutput> => {
  checkS3();
  try {
    const params = {
      Bucket: bucketName,
      Key: key,
    };
    const result = await s3!.getObject(params).promise();
    logger.info(`Object downloaded from bucket ${bucketName} with key ${key}`);
    return result;
  } catch (error) {
    logger.error('Error downloading object from S3:', error);
    throw error;
  }
};

/**
 * Deletes an object from the specified S3 bucket.
 */
export const deleteObject = async (
  key: string,
): Promise<AWS.S3.DeleteObjectOutput> => {
  checkS3();
  try {
    const params = {
      Bucket: bucketName,
      Key: key,
    };
    const result = await s3!.deleteObject(params).promise();
    logger.info(`Object deleted from bucket ${bucketName} with key ${key}`);
    return result;
  } catch (error) {
    logger.error('Error deleting object from S3:', error);
    throw error;
  }
};

/**
 * Lists objects in the specified S3 bucket.
 */
export const listObjects = async (): Promise<AWS.S3.ListObjectsV2Output> => {
  checkS3();
  try {
    const params = {
      Bucket: bucketName,
    };
    const result = await s3!.listObjectsV2(params).promise();
    logger.info(`Objects listed in bucket ${bucketName}`);
    return result;
  } catch (error) {
    logger.error('Error listing objects in S3:', error);
    throw error;
  }
};
