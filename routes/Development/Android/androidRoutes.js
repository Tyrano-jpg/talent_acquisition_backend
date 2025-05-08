import { Router } from 'express';
// import AuthMiddleware from "../../../middlewares/verifyToken";
// import RolesPermissions from "../../../middlewares/permission";
// import { listing_new_srmern } from "../../../controllers/development/srMern/new.controller";
import AuthMiddleware from '../../../middlewares/verifyToken.js';
import { listing_android } from '../../../controllers/development/android/android.controller.js';
import { updating_android } from '../../../controllers/development/android/updatingandroid.js';

const androidRouter = Router();
console.log('oiwer9wer');

androidRouter.post(
  '/list',
  AuthMiddleware,
  // RolesPermissions('user', 'add'),
   listing_android
);

androidRouter.post('/update', AuthMiddleware, updating_android);

export default androidRouter;
