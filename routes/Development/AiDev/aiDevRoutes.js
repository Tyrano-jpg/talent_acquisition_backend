import { Router } from 'express';
import AuthMiddleware from '../../../middlewares/verifyToken.js';
import RolesPermissions from '../../../middlewares/permission.js';
import { MulterFunction } from '../../../config/multer/multer.js';
import { updating_aidev } from '../../../controllers/development/aiDev/updateaidev.controller.js';
import { listing_newaidev } from '../../../controllers/development/aiDev/aidev.controller.js';
import { aidev_bulkUpload } from '../../../controllers/development/aiDev/bulkupload.controller.js';
import { uploadCandidateDataAIDev } from '../../../controllers/development/aiDev/uploadCandidate.controller.js';
import { edit_ai } from '../../../controllers/development/aiDev/edit.controller.js';
import { downloadCSVAi } from '../../../controllers/development/aiDev/generatecsv.js';
import { generateAndSendPDFAi } from '../../../controllers/development/aiDev/offerLetter.controller.js';
const aiDevRouter = Router();

aiDevRouter.post(
  '/list',
  AuthMiddleware,
  listing_newaidev
);

aiDevRouter.post('/send-letter', AuthMiddleware, generateAndSendPDFAi)

aiDevRouter.post('/update/:_id', AuthMiddleware, updating_aidev);

aiDevRouter.post('/edit/:_id', AuthMiddleware, edit_ai);

aiDevRouter.post('/bulk-upload', AuthMiddleware, aidev_bulkUpload);

aiDevRouter.post('/upload-candidate',AuthMiddleware, MulterFunction(`public/upload/pdf`).fields([
  { name: 'resume_file' },
]), uploadCandidateDataAIDev)

aiDevRouter.get('download-csv', AuthMiddleware, downloadCSVAi)

export default aiDevRouter;
