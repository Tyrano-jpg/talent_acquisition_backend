import { Router } from 'express';
import AuthMiddleware from '../../../middlewares/verifyToken.js';
import { MulterFunction } from '../../../config/multer/multer.js';
import { listing_newdigitalmarketing } from '../../../controllers/design/digitalMarketing/digitalmarketig.controller.js';
import { uploadCandidateDataDigitalMarketing } from '../../../controllers/design/digitalMarketing/uploadCandidate.controller.js';
import { updating_digitalmarketing } from '../../../controllers/design/digitalMarketing/updatingdigitalmarketing.js';
import { downloadCSVDigitalMarketing } from '../../../controllers/design/digitalMarketing/generatecsv.js';
import { edit_digitalmarketing } from '../../../controllers/design/digitalMarketing/edit.controller.js';
import { digitalmarketing_bulkUpload } from '../../../controllers/design/digitalMarketing/bulkupload.controller.js';
const digitalMarketingRouter = Router();

digitalMarketingRouter.post(
  '/list',
  AuthMiddleware,
  listing_newdigitalmarketing
);

digitalMarketingRouter.post('/update/:_id', AuthMiddleware, updating_digitalmarketing);

digitalMarketingRouter.post('/edit/:_id', AuthMiddleware, edit_digitalmarketing);

digitalMarketingRouter.post('/bulk-upload', AuthMiddleware, digitalmarketing_bulkUpload);

digitalMarketingRouter.post('/upload-candidate', MulterFunction(`public/upload/pdf`).fields([
  { name: 'resume_file' },
]), uploadCandidateDataDigitalMarketing)

digitalMarketingRouter.get('download-csv', AuthMiddleware, downloadCSVDigitalMarketing)

export default digitalMarketingRouter;
