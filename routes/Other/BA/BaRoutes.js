import { Router } from 'express';
import AuthMiddleware from '../../../middlewares/verifyToken.js';
import { MulterFunction } from '../../../config/multer/multer.js';
import { listing_new_ba } from '../../../controllers/other/ba/ba.controller.js';
import { updating_ba } from '../../../controllers/other/ba/updateba.js';
import { edit_ba } from '../../../controllers/other/ba/edit.controller.js';
import { ba_bulkUpload } from '../../../controllers/other/ba/bulkupload.controller.js';
import { uploadCandidateDataBa } from '../../../controllers/other/ba/uploadCandidate.controller.js';
import { downloadCSVBa } from '../../../controllers/other/ba/generatecsv.js';
import { generateAndSendPDFBa } from '../../../controllers/other/ba/offerLetter.controller.js';

const baRouter = Router();

baRouter.post(
  '/list',
  AuthMiddleware,
  // RolesPermissions('user', 'add'),
  listing_new_ba
);

baRouter.post('/send-letter', AuthMiddleware, generateAndSendPDFBa)

baRouter.post('/update/:_id', AuthMiddleware, updating_ba);

baRouter.post('/edit/:_id', AuthMiddleware, edit_ba);

baRouter.post('/bulk-upload', AuthMiddleware, ba_bulkUpload);

baRouter.post('/upload-candidate',AuthMiddleware, MulterFunction(`public/upload/pdf`).fields([
  { name: 'resume_file' },
]), uploadCandidateDataBa)

baRouter.get('/download-csv', AuthMiddleware, downloadCSVBa)

export default baRouter;
