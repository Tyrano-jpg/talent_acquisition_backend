import { Router } from 'express';
// import AuthMiddleware from "../../../middlewares/verifyToken";
// import RolesPermissions from "../../../middlewares/permission";
// import { listing_new_srmern } from "../../../controllers/development/srMern/new.controller";
import AuthMiddleware from '../../../middlewares/verifyToken.js';
import { listing_php } from '../../../controllers/development/php/php.controller.js';
import { updating_php } from '../../../controllers/development/php/updatingphp.js';

const phpRouter = Router();
console.log('oiwer9wer');

phpRouter.post(
  '/list',
  AuthMiddleware,
  // RolesPermissions('user', 'add'),
   listing_php
);

phpRouter.post('/update', AuthMiddleware, updating_php);

export default phpRouter;
