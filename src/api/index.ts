import { Router } from 'express';
import routess from './routes/routess';
export default () => {
  const router = Router();
  routess(router);
  return router;
};
