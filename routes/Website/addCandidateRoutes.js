import { Router } from 'express';
import AuthMiddleware from '../../../middlewares/verifyToken.js';

const careerRouter = Router();
console.log('oiwer9wer');

careerRouter.post(
  '/add-candidate',
  AuthMiddleware,
  // RolesPermissions('user', 'add'),
  
);


export default careerRouter;
