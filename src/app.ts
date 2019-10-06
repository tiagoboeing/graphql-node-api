import express from 'express';
import { Request, Response, NextFunction } from 'express-serve-static-core';

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
  }

  private middleware(): void {
    this.express.use(
      '/hello',
      (req: Request, res: Response, next: NextFunction) => {
        res.send({ hello: 'hello' });
      }
    );
  }
}

export default new App().express;
