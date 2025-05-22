import { Router } from 'express';
import AuthMiddleware from '../../../middlewares/verifyToken.js';
import { MulterFunction } from '../../../config/multer/multer.js';
import { listing_newgraphics } from '../../../controllers/design/graphicDesign/graphics.controller.js';
import { graphics_bulkUpload } from '../../../controllers/design/graphicDesign/bulkupload.controller.js';
import { edit_graphics } from '../../../controllers/design/graphicDesign/edit.controller.js';
import { downloadCSVGraphics } from '../../../controllers/design/graphicDesign/generatecsv.js';
import { updating_graphics } from '../../../controllers/design/graphicDesign/updategraphics.js';
import { uploadCandidateDataGraphics } from '../../../controllers/design/graphicDesign/uploadCandidate.controller.js';

const graphicRouter = Router();

graphicRouter.post(
  '/list',
  AuthMiddleware,
  listing_newgraphics
);

graphicRouter.post('/update/:_id', AuthMiddleware, updating_graphics);

graphicRouter.post('/edit/:_id', AuthMiddleware, edit_graphics);

graphicRouter.post('/bulk-upload', AuthMiddleware, graphics_bulkUpload);

graphicRouter.post('/upload-candidate', MulterFunction(`public/upload/pdf`).fields([
  { name: 'resume_file' },
]), uploadCandidateDataGraphics)

graphicRouter.get('download-csv', AuthMiddleware, downloadCSVGraphics)

export default graphicRouter;
