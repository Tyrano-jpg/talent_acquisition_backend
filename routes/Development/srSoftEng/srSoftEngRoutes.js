import { Router } from 'express';
// import AuthMiddleware from "../../../middlewares/verifyToken";
// import RolesPermissions from "../../../middlewares/permission";
// import { listing_new_srmern } from "../../../controllers/development/srMern/new.controller";
import AuthMiddleware from '../../../middlewares/verifyToken.js';
import { listing_srsofteng } from '../../../controllers/development/srSoftEng/srsofteng.controller.js';
import { updating_srsofteng } from '../../../controllers/development/srSoftEng/updatingsrsofteng.js';

const srSoftEngRouter = Router();
console.log('oiwer9wer');

srSoftEngRouter.post(
  '/list',
  AuthMiddleware,
  // RolesPermissions('user', 'add'),
   listing_srsofteng
);

srSoftEngRouter.post('/update', AuthMiddleware, updating_srsofteng);

export default srSoftEngRouter;
