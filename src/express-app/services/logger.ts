import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { Request } from 'express';
import { LoggerOptions } from 'shared/types/Logger';

const getNestedReq = (obj: any): any => {
  if (obj === null || typeof obj !== 'object') return null;
  if (obj.req) return obj.req;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const result = getNestedReq(obj[key]);
      if (result) return result;
    }
  }
  return null;
};

const createLogger = (options: LoggerOptions = {}) => {
  const logLevel = options.logLevel || 'info';
  const appName = options.appName || 'app';
  const logFilename = options.logFilename || 'logs/%DATE%-combined.log';
  const maxFiles = options.maxFiles || '14d';

  return winston.createLogger({
    level: logLevel,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
      winston.format.printf(
        (info: winston.Logform.TransformableInfo & { req?: Request }) => {
          const { timestamp, level, message, meta } = info;
          const req = getNestedReq(meta);
          const logId = req?.headers['logid'] || '';
          return `${timestamp} [${level}] ${appName}: ${message} ${logId ? `logId=${logId}` : ''}`;
        },
      ),
    ),
    transports: [
      new winston.transports.Console(),
      new DailyRotateFile({
        filename: logFilename,
        datePattern: 'YYYY-MM-DD',
        maxFiles: maxFiles,
      }),
    ],
  });
};

const logger = createLogger();

export { logger as log };

export default logger;
