import 'winston-daily-rotate-file';

import { createLogger, format, transports } from 'winston';

// custom log display format
const customFormat = format.printf(
  ({ timestamp, level, stack, message }: any) => {
    return `${timestamp} - [${level.toUpperCase().padEnd(7)}] - ${stack || message}`;
  },
);

// Daily rotation configuration
const dailyRotateFileTransport = new transports.DailyRotateFile({
  dirname: 'logs', // Log directory
  filename: 'application-%DATE%.log', // Log file pattern
  datePattern: 'YYYY-MM-DD', // Rotate logs daily
  zippedArchive: true, // Compress old logs
  maxSize: '20m', // Max log file size
  maxFiles: '14d', // Keep logs for 14 days
  level: 'info',
});

// Separate error log rotation
const errorRotateFileTransport = new transports.DailyRotateFile({
  dirname: 'logs', // Log directory
  filename: 'error-%DATE%.log', // Log file pattern
  datePattern: 'YYYY-MM-DD', // Rotate logs daily
  zippedArchive: true, // Compress old logs
  maxSize: '20m', // Max log file size
  maxFiles: '14d', // Keep logs for 14 days
  level: 'error',
});

// for development environment
const devLogger = {
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    customFormat,
  ),
  transports: [new transports.Console({ level: 'silly' })],
};

// for production environment
const prodLogger = {
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.json(),
  ),
  transports: [
    dailyRotateFileTransport, // Daily log rotation
    errorRotateFileTransport, // Separate daily error logs
  ],
};

// export log instance based on the current environment
const instanceLogger =
  process.env.NODE_ENV === 'production' ? prodLogger : devLogger;

export const instance = createLogger(instanceLogger);
