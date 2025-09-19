import express from 'express';
import careerRouter from './addCandidateRoutes.js';
const allWebsiteRouter = express.Router();

console.log("jai shree ram ji")

allWebsiteRouter.use('/career', careerRouter)


export default allWebsiteRouter;
