import { Router } from 'express';
// import AuthMiddleware from "../../../middlewares/verifyToken";
// import RolesPermissions from "../../../middlewares/permission";
// import { listing_new_srmern } from "../../../controllers/development/srMern/new.controller";
import AuthMiddleware from '../../../middlewares/verifyToken.js';
import { listing_jrflutter } from '../../../controllers/development/jrflutter/jrflutter.controller.js';
import { updating_jrflutter } from '../../../controllers/development/jrFlutter/updatingjrflutter.js';

const jrflutterRouter = Router();
console.log('oiwer9wer');

jrflutterRouter.post(
  '/list',
  AuthMiddleware,
  // RolesPermissions('user', 'add'),
   listing_jrflutter
);

jrflutterRouter.post('/update', AuthMiddleware, updating_jrflutter);

export default jrflutterRouter;
