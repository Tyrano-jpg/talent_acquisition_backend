import { Router } from 'express';
import AuthMiddleware from '../../../middlewares/verifyToken.js';
import { stats_count } from '../../../controllers/dashboard/SrMern/count.controller.js';

const statsRouter = Router();

statsRouter.post('/count', AuthMiddleware, stats_count);


export default statsRouter;
