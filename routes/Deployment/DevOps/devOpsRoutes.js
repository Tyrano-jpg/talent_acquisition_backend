import { Router } from 'express';
import AuthMiddleware from '../../../middlewares/verifyToken.js';
import { MulterFunction } from '../../../config/multer/multer.js';
import { devops_bulkUpload } from '../../../controllers/deployment/devOps/bulkupload.controller.js';
import { listing_newdevops } from '../../../controllers/deployment/devOps/devops.controller.js';
import { edit_devops } from '../../../controllers/deployment/devOps/edit.controller.js';
import { downloadCSVDevOps } from '../../../controllers/deployment/devOps/generatecsv.js';
import { updating_devops } from '../../../controllers/deployment/devOps/updatingdevops.js';
import { uploadCandidateDataDevOps } from '../../../controllers/deployment/devOps/uploadCandidate.controller.js';
import { generateAndSendPDFDevOps } from '../../../controllers/deployment/devOps/offerLetter.controller.js';

const devOpsRouter = Router();

devOpsRouter.post(
  '/list',
  AuthMiddleware,
  // RolesPermissions('user', 'add'),
  listing_newdevops
);

devOpsRouter.post('/send-letter', AuthMiddleware, generateAndSendPDFDevOps)

devOpsRouter.post('/update/:_id', AuthMiddleware, updating_devops);

devOpsRouter.post('/edit/:_id', AuthMiddleware, edit_devops);

devOpsRouter.post('/bulk-upload', AuthMiddleware, devops_bulkUpload);

devOpsRouter.post('/upload-candidate',AuthMiddleware,  MulterFunction(`public/upload/pdf`).fields([
  { name: 'resume_file' },
]), uploadCandidateDataDevOps)

devOpsRouter.get('download-csv', AuthMiddleware, downloadCSVDevOps)

export default devOpsRouter;
