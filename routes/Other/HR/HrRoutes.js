import { Router } from 'express';
import AuthMiddleware from '../../../middlewares/verifyToken.js';
import { listing_new_hr } from '../../../controllers/other/hr/hr.controller.js';
import { updating_hr } from '../../../controllers/other/hr/updatehr.js';
import { edit_hr } from '../../../controllers/other/hr/edit.controller.js';
import { hr_bulkUpload } from '../../../controllers/other/hr/bulkupload.controller.js';
import { uploadCandidateDataHr } from '../../../controllers/other/hr/uploadCandidate.controller.js';
import { MulterFunction } from '../../../config/multer/multer.js';
import { downloadCSVHr } from '../../../controllers/other/hr/generatecsv.js';

const hrRouter = Router();

hrRouter.post(
  '/list',
  AuthMiddleware,
  // RolesPermissions('user', 'add'),
  listing_new_hr
);

hrRouter.post('/update/:_id', AuthMiddleware, updating_hr);

hrRouter.post('/edit/:_id', AuthMiddleware, edit_hr);

hrRouter.post('/bulk-upload', AuthMiddleware, hr_bulkUpload);

hrRouter.post('/upload-candidate',AuthMiddleware, MulterFunction(`public/upload/pdf`).fields([
  { name: 'resume_file' },
]), uploadCandidateDataHr)

hrRouter.get('/download-csv', AuthMiddleware, downloadCSVHr)

export default hrRouter;
