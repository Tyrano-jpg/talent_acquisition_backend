import { Router } from 'express';
import AuthMiddleware from '../../middlewares/verifyToken.js';
import { getHiredApplications } from '../../controllers/hired/hired.controller.js';

const hiredRouter = Router();


hiredRouter.post('/candidates', AuthMiddleware, getHiredApplications);

export default hiredRouter;
