import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import schema from './graphql/schema';
import db from './models';
class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
  }

  private middleware(): void {
    this.express.use(
      '/graphql',
      (req: any, _res: any, next: any) => {
        req['context'] = {};
        req['context'].db = db;
        next();
      },
      graphqlHTTP(req => ({
        schema,
        graphiql: this.isDevelopment(),
        context: req['context']
      }))
    );
  }

  private isDevelopment() {
    return process.env.NODE_ENV === 'development';
  }
}

export default new App().express;
