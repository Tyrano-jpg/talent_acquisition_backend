import express from 'express';
import srMernRouter from './SrMern/srMernRoutes.js';
const allDevelopmentRouter = express.Router();

console.log("jsfjsbfjs")

allDevelopmentRouter.use('/sr-mern', srMernRouter)
// allDevelopmentRouter.use('/jr-mern', srMernRouter)

export default allDevelopmentRouter;
