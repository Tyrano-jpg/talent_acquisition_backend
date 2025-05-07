import { Router } from 'express';
// import AuthMiddleware from "../../../middlewares/verifyToken";
// import RolesPermissions from "../../../middlewares/permission";
// import { listing_new_srmern } from "../../../controllers/development/srMern/new.controller";
import AuthMiddleware from '../../../middlewares/verifyToken.js';
import { listing_srflutter } from '../../../controllers/development/srFlutter/srflutter.controller.js';
import { updating_srflutter } from '../../../controllers/development/srFlutter/updatingsrflutter.js';

const srflutterRouter = Router();
console.log('oiwer9wer');

srflutterRouter.post(
  '/list',
  AuthMiddleware,
  // RolesPermissions('user', 'add'),
   listing_srflutter
);

srflutterRouter.post('/update', AuthMiddleware, updating_srflutter);

export default srflutterRouter;
