import { Router } from 'express';
import AuthMiddleware from '../../../middlewares/verifyToken.js';
import { MulterFunction } from '../../../config/multer/multer.js';
import { listing_new_srsofteng } from '../../../controllers/development/srSoftEng/srsofteng.controller.js';
import { updating_srsofteng } from '../../../controllers/development/srSoftEng/updatesrsofteng.js';
import { srsofteng_bulkUpload } from '../../../controllers/development/srSoftEng/bulkupload.controller.js';
import { uploadCandidateDataSrSoftEng } from '../../../controllers/development/srSoftEng/uploadCandidate.controller.js';
import { downloadCSVJrSoftEng } from '../../../controllers/development/jrSoftEng/genratecsv.js';
import { edit_srsofteng } from '../../../controllers/development/srSoftEng/edit.controller.js';
import { generateAndSendPDFSrSoftEng } from '../../../controllers/development/srSoftEng/offerLetter.controller.js';

const srSoftEngRouter = Router();

srSoftEngRouter.post(
  '/list',
  AuthMiddleware,
  // RolesPermissions('user', 'add'),
  listing_new_srsofteng
);

srSoftEngRouter.post('/send-letter', AuthMiddleware, generateAndSendPDFSrSoftEng)

srSoftEngRouter.post('/update/:_id', AuthMiddleware, updating_srsofteng);

srSoftEngRouter.post('/edit/:id', AuthMiddleware, edit_srsofteng)

srSoftEngRouter.post('/bulk-upload', AuthMiddleware, srsofteng_bulkUpload);

srSoftEngRouter.post('/upload-candidate',AuthMiddleware, MulterFunction(`public/upload/pdf`).fields([
  { name: 'resume_file' },
]), uploadCandidateDataSrSoftEng)

srSoftEngRouter.get('/download-csv', AuthMiddleware, downloadCSVJrSoftEng)

export default srSoftEngRouter;
