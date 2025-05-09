import { Router } from 'express';
// import AuthMiddleware from "../../../middlewares/verifyToken";
// import RolesPermissions from "../../../middlewares/permission";
// import { listing_new_srmern } from "../../../controllers/development/srMern/new.controller";
import AuthMiddleware from '../../../middlewares/verifyToken.js';
import RolesPermissions from '../../../middlewares/permission.js';
import { listing_new_srmern } from '../../../controllers/development/srMern/new.controller.js';
import { updating_srmern } from '../../../controllers/development/srMern/updatesrmern.js';
import { srmern_bulkUpload } from '../../../controllers/development/srMern/bulkupload.controller.js';

const srMernRouter = Router();
console.log('oiwer9wer');

srMernRouter.post(
  '/list',
  AuthMiddleware,
  // RolesPermissions('user', 'add'),
  listing_new_srmern
);

srMernRouter.post('/update/:_id', AuthMiddleware, updating_srmern);

srMernRouter.post('/bulk-upload', AuthMiddleware, srmern_bulkUpload)

export default srMernRouter;
