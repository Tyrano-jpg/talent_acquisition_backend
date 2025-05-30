import { Router } from 'express';
import AuthMiddleware from '../../../middlewares/verifyToken.js';
import { stats_count } from '../../../controllers/dashboard/All/count.controller.js';
import { offer_letter_controller } from '../../../controllers/dashboard/All/offerletter.controller.js';

const statsRouter = Router();

statsRouter.post('/count', AuthMiddleware, stats_count);
statsRouter.post('/offer-letter', AuthMiddleware, offer_letter_controller)


export default statsRouter;
