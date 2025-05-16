import { Router } from 'express';
import AuthMiddleware from '../../../middlewares/verifyToken.js';

const hrRouter = Router();

export default hrRouter;
