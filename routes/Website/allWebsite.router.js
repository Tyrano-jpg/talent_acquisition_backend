import express from 'express';
import careerRouter from './addCandidateRoutes.js';
const allWebsiteRouter = express.Router();

console.log("jsfjsbfjs")

allWebsiteRouter.use('/career', careerRouter)


export default allWebsiteRouter;
