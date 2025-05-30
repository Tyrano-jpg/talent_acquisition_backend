import express from 'express';
import srMernDashboardRouter from './dashboardRoutes/srMern.js';

const allDashboardRouter = express.Router();

allDashboardRouter.use('/stats', srMernDashboardRouter)


export default allDashboardRouter;