import { Router } from 'express';
import AuthMiddleware from '../../../middlewares/verifyToken.js';
import { MulterFunction } from '../../../config/multer/multer.js';
import { listing_new_bd } from '../../../controllers/other/bd/bd.controller.js';
import { updating_bd } from '../../../controllers/other/bd/updatebd.js';
import { edit_bd } from '../../../controllers/other/bd/edit.controller.js';
import { bd_bulkUpload } from '../../../controllers/other/bd/bulkupload.js';
import { uploadCandidateDataBd } from '../../../controllers/other/bd/uploadCandidate.controller.js';
import { downloadCSVBd } from '../../../controllers/other/bd/generatecsv.js';

const bdRouter = Router();

bdRouter.post(
  '/list',
  AuthMiddleware,
  listing_new_bd
);

bdRouter.post('/update/:_id', AuthMiddleware, updating_bd);

bdRouter.post('/edit/:_id', AuthMiddleware, edit_bd);

bdRouter.post('/bulk-upload', AuthMiddleware, bd_bulkUpload);

bdRouter.post('/upload-candidate',AuthMiddleware, MulterFunction(`public/upload/pdf`).fields([
  { name: 'resume_file' },
]), uploadCandidateDataBd)

bdRouter.get('/download-csv', AuthMiddleware, downloadCSVBd)

export default bdRouter;
