import { Router } from 'express';
import AuthMiddleware from '../../../middlewares/verifyToken.js';
import RolesPermissions from '../../../middlewares/permission.js';
import { MulterFunction } from '../../../config/multer/multer.js';
import { listing_new_php } from '../../../controllers/development/php/php.controller.js';
import { updating_php } from '../../../controllers/development/php/updatephp.js';
import { php_bulkUpload } from '../../../controllers/development/php/bulkupload.controller.js';
import { uploadCandidateDataPhp } from '../../../controllers/development/php/uploadCandidate.controller.js';

const phpRouter = Router();
console.log('oiwer9wer');

phpRouter.post(
  '/list',
  AuthMiddleware,
  // RolesPermissions('user', 'add'),
  listing_new_php
);

phpRouter.post('/update/:_id', AuthMiddleware, updating_php);

phpRouter.post('/bulk-upload', AuthMiddleware, php_bulkUpload);

phpRouter.post('/upload-candidate', MulterFunction(`public/upload/pdf`).fields([
  { name: 'resume_file' },
]), uploadCandidateDataPhp)

// jrSoftEngRouter.post('/update-status', AuthMiddleware, updateStatus)

export default phpRouter;
