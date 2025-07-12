import 'express';

import { SessionContainerInterface } from 'supertokens-node/recipe/session';

declare module 'express' {
  interface Request {
    session?: SessionContainerInterface;
    userId?: string;
  }
}
