import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  constructor(private logger: Logger) {
    this.logger.setContext('RequestLogger');
  }

  use(req: Request, res: Response, next: Function) {
    req.headers.id = new Date().getTime().toString();
    const timeStart = new Date();
    res.on('finish', () => {
      const duration = new Date().getTime() - timeStart.getTime();

      let message = `${req.method} ${req.url} ${res.statusCode} ${duration} ms`;
      if (req.user) {
        // @ts-ignore
        message += ` - ${req.user.email} (${req.user.id}) `;
      }
      if (res.statusCode < 400) {
        this.logger.log(message);
      } else if (res.statusCode >= 400 && res.statusCode < 500) {
        this.logger.warn(message);
      } else {
        this.logger.error(message);
      }
    });
    return next();
  }
}
