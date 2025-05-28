import { Router } from 'express';
import AuthMiddleware from '../../../middlewares/verifyToken.js';
import { srmern_count } from '../../../controllers/dashboard/SrMern/count.controller.js';

const srMernDashboardRouter = Router();

srMernDashboardRouter.post('/count', AuthMiddleware, srmern_count);


export default srMernDashboardRouter;
