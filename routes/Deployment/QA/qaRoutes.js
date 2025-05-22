import { Router } from 'express';
import AuthMiddleware from '../../../middlewares/verifyToken.js';
import { MulterFunction } from '../../../config/multer/multer.js';
import { qa_bulkUpload } from '../../../controllers/deployment/qa/bulkupload.controller.js';
import { edit_qa } from '../../../controllers/deployment/qa/edit.controller.js';
import { downloadCSVQA } from '../../../controllers/deployment/qa/generatecsv.js';
import { listing_newqa } from '../../../controllers/deployment/qa/qa.controller.js';
import { updating_qa } from '../../../controllers/deployment/qa/updatingqa.js';
import { uploadCandidateDataQa } from '../../../controllers/deployment/qa/uploadCandidate.controller.js';

const qaRouter = Router();

qaRouter.post(
  '/list',
  AuthMiddleware,
  // RolesPermissions('user', 'add'),
  listing_newqa
);

qaRouter.post('/update/:_id', AuthMiddleware, updating_qa);

qaRouter.post('/edit/:_id', AuthMiddleware, edit_qa);

qaRouter.post('/bulk-upload', AuthMiddleware, qa_bulkUpload);

qaRouter.post('/upload-candidate', MulterFunction(`public/upload/pdf`).fields([
  { name: 'resume_file' },
]), uploadCandidateDataQa)

qaRouter.get('download-csv', AuthMiddleware, downloadCSVQA)

export default qaRouter;
