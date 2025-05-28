import express from 'express';
import srMernDashboardRouter from './SrMern/srMern.js';

const allDashboardRouter = express.Router();

allDashboardRouter.use('/sr-mern', srMernDashboardRouter)


export default allDashboardRouter;