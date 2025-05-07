import express from 'express';
import srMernRouter from './SrMern/srMernRoutes.js';
import jrMernRouter from './JrMern/jrMernRoutes.js';
import srSoftEngRouter from './srSoftEng/srSoftEngRoutes.js';
import jrSoftEngRouter from './jrSoftEng/jrSoftEngRoutes.js';
import phpRouter from './Php/phpRoutes.js';
import jrflutterRouter from './jrFlutter/jrFlutterRoutes.js';
import srflutterRouter from './srFlutter/srFlutterRoutes.js';

const allDevelopmentRouter = express.Router();

console.log("jsfjsbfjs")

allDevelopmentRouter.use('/sr-mern', srMernRouter)
allDevelopmentRouter.use('/jr-mern', jrMernRouter)
allDevelopmentRouter.use('/sr-soft-eng', srSoftEngRouter)
allDevelopmentRouter.use('/jr-soft-eng', jrSoftEngRouter)
allDevelopmentRouter.use('php', phpRouter)
allDevelopmentRouter.use('/jr-flutter', jrflutterRouter)
allDevelopmentRouter.use('/sr-flutter', srflutterRouter)


export default allDevelopmentRouter;