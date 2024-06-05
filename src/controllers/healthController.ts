import { Request, Response } from 'express';

export const helloWorld = (req: Request, res: Response) => {
  res.send('Hello, World!');
};

export const healthCheck = (req: Request, res: Response) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
  };

  try {
    res.send(healthcheck);
  } catch (e) {
    healthcheck.message = (e as Error).toString();
    res.status(503).send();
  }
};
