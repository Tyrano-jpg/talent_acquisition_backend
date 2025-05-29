import express from 'express';
import srMernDashboardRouter from './SrMern/srMern.js';

const allDashboardRouter = express.Router();

allDashboardRouter.use('/stats', srMernDashboardRouter)


export default allDashboardRouter;