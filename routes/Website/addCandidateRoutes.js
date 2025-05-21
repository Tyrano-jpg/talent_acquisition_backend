import { Router } from 'express';
import { AddJobApplication } from '../../controllers/website/career/addcandidate.controller.js';
import { MulterFunction } from '../../config/multer/multer.js';

const careerRouter = Router();

careerRouter.post(
  '/add-candidate',
  MulterFunction,
  // RolesPermissions('user', 'add'),
  AddJobApplication  
);


export default careerRouter;
