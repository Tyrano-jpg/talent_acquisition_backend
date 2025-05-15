import express from 'express';
import srMernRouter from './SrMern/srMernRoutes.js';
import jrMernRouter from './JrMern/jrMernRoutes.js';

const allDevelopmentRouter = express.Router();

console.log("jsfjsbfjs")

allDevelopmentRouter.use('/sr-mern', srMernRouter)
allDevelopmentRouter.use('/jr-mern', jrMernRouter)


export default allDevelopmentRouter;