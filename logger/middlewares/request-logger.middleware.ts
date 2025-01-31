import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger();

  use(req: Request, res: Response, next: NextFunction) {
    const { method, url, body, query, params } = req;
    this.logger.log(
      `[${method}] ${url} - Request: ${JSON.stringify({ params, query, body })}`,
    );

    res.on('finish', () => {
      const statusCode = res.statusCode;
      if (statusCode === 401 || statusCode === 404 || statusCode === 405) {
        this.logger.warn(`[${method}] ${url} - Response: ${statusCode}`);
      }
    });

    next();
  }
}
