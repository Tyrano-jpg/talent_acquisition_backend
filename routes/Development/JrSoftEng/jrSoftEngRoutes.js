import { Router } from 'express';
import AuthMiddleware from '../../../middlewares/verifyToken.js';
import RolesPermissions from '../../../middlewares/permission.js';
import { MulterFunction } from '../../../config/multer/multer.js';
import { listing_new_jrsofteng } from '../../../controllers/development/jrSoftEng/jrsofteng.controller.js';
import { updating_jrsofteng } from '../../../controllers/development/jrSoftEng/updatejrsofteng.js';
import { jrsofteng_bulkUpload } from '../../../controllers/development/jrSoftEng/bulkupload.controller.js';
import { uploadCandidateDataJrSoftEng } from '../../../controllers/development/jrSoftEng/uploadCandidate.controller.js';
import { edit_jrsofteng } from '../../../controllers/development/jrSoftEng/edit.controller.js';
import { downloadCSVJrSoftEng } from '../../../controllers/development/jrSoftEng/genratecsv.js';

const jrSoftEngRouter = Router();

jrSoftEngRouter.post(
  '/list',
  AuthMiddleware,
  // RolesPermissions('user', 'add'),
  listing_new_jrsofteng
);

jrSoftEngRouter.post('/update/:_id', AuthMiddleware, updating_jrsofteng);

jrSoftEngRouter.post('/edit/:id', AuthMiddleware, edit_jrsofteng)

jrSoftEngRouter.post('/bulk-upload', AuthMiddleware, jrsofteng_bulkUpload);

jrSoftEngRouter.post('/upload-candidate',AuthMiddleware, MulterFunction(`public/upload/pdf`).fields([
  { name: 'resume_file' },
]), uploadCandidateDataJrSoftEng)

jrSoftEngRouter.get('/download-csv', AuthMiddleware, downloadCSVJrSoftEng)


export default jrSoftEngRouter;
