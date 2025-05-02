import { Router } from 'express';
// import AuthMiddleware from "../../../middlewares/verifyToken";
// import RolesPermissions from "../../../middlewares/permission";
// import { listing_new_srmern } from "../../../controllers/development/srMern/new.controller";
import AuthMiddleware from '../../../middlewares/verifyToken.js';
import RolesPermissions from '../../../middlewares/permission.js';
import { listing_new_jrmern } from '../../../controllers/development/jrMern/jrmern.controller.js';
import { updating_jrmern } from '../../../controllers/development/jrMern/updatingjrmern.js';

const jrMernRouter = Router();
console.log('oiwer9wer');

jrMernRouter.post(
  '/list',
  AuthMiddleware,
  // RolesPermissions('user', 'add'),
   listing_new_jrmern
);

jrMernRouter.post('/update', AuthMiddleware, updating_jrmern);

export default jrMernRouter;
