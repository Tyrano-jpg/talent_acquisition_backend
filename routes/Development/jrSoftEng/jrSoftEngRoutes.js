import { Router } from 'express';
// import AuthMiddleware from "../../../middlewares/verifyToken";
// import RolesPermissions from "../../../middlewares/permission";
// import { listing_new_srmern } from "../../../controllers/development/srMern/new.controller";
import AuthMiddleware from '../../../middlewares/verifyToken.js';
import { listing_jrsofteng } from '../../../controllers/development/jrSoftEng/jrsofteng.controller.js';
import { updating_jrsofteng } from '../../../controllers/development/jrSoftEng/updatejrsofteng.js';

const jrSoftEngRouter = Router();
console.log('oiwer9wer');

jrSoftEngRouter.post(
  '/list',
  AuthMiddleware,
  // RolesPermissions('user', 'add'),
   listing_jrsofteng
);

jrSoftEngRouter.post('/update', AuthMiddleware, updating_jrsofteng);

export default jrSoftEngRouter;
