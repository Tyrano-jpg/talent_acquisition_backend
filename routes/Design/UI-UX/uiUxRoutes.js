import { Router } from 'express';
import AuthMiddleware from '../../../middlewares/verifyToken.js';
import { MulterFunction } from '../../../config/multer/multer.js';
import { uiux_bulkUpload } from '../../../controllers/design/uiUx/bulkupload.controller.js';
import { edit_uiux } from '../../../controllers/design/uiUx/edit.controller.js';
import { downloadCSVUiUx } from '../../../controllers/design/uiUx/generatecsv.js';
import { listing_newuiux } from '../../../controllers/design/uiUx/uiux.controller.js';
import { updating_uiux } from '../../../controllers/design/uiUx/updateuiux.controller.js';
import { uploadCandidateDataUiUx } from '../../../controllers/design/uiUx/uploadCadidate.controller.js';

const uiuxRouter = Router();

uiuxRouter.post(
  '/list',
  AuthMiddleware,
  listing_newuiux
);

uiuxRouter.post('/update/:_id', AuthMiddleware, updating_uiux);

uiuxRouter.post('/edit/:_id', AuthMiddleware, edit_uiux);

uiuxRouter.post('/bulk-upload', AuthMiddleware, uiux_bulkUpload);

uiuxRouter.post('/upload-candidate', MulterFunction(`public/upload/pdf`).fields([
  { name: 'resume_file' },
]), uploadCandidateDataUiUx)

uiuxRouter.get('download-csv', AuthMiddleware, downloadCSVUiUx)

export default uiuxRouter;
