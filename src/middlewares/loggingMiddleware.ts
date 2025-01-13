import { Express, Request, Response, NextFunction } from 'express';
import expressWinston from 'express-winston';
import morgan from 'morgan';
import { v4 as uuidv4 } from 'uuid';
import log from '../services/logger';

export const logIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const logId = req.headers['logid'] || '';
  const spanId = uuidv4();
  req.headers['logid'] = logId;
  req.headers['spanid'] = spanId;
  next();
};

export const morganMiddleware = morgan((tokens, req, res) => {
  return JSON.stringify({
    logId: req.headers['logid'],
    spanId: req.headers['spanid'],
    method: tokens.method(req, res),
    url: tokens.url(req, res),
    status: tokens.status(req, res),
    responseTime: tokens['response-time'](req, res) + ' ms',
    userAgent: tokens['user-agent'](req, res),
  });
});

export const expressWinstonMiddleware = expressWinston.logger({
  winstonInstance: log,
  meta: true,
  msg: 'HTTP {{req.method}} {{req.url}}',
  expressFormat: true,
  colorize: false,
  ignoreRoute: function (req, res) {
    return false;
  },
});
