import express from 'express';
import srMernRouter from './SrMern/srMernRoutes.js';
import jrMernRouter from './JrMern/jrMernRoutes.js';
import jrSoftEngRouter from './JrSoftEng/jrSoftEngRoutes.js';
import srSoftEngRouter from './srSoftEng/srSoftEngRoutes.js';
import phpRouter from './Php/phpRoutes.js';
import jrFlutterRouter from './JrFlutterDev/jrFlutterRoutes.js';
import srFlutterRouter from './SrFlutterDev/srFlutterRoutes.js';

const allDevelopmentRouter = express.Router();

console.log("jsfjsbfjs")

allDevelopmentRouter.use('/sr-mern', srMernRouter)
allDevelopmentRouter.use('/jr-mern', jrMernRouter)
allDevelopmentRouter.use('/jr-soft-eng', jrSoftEngRouter)
allDevelopmentRouter.use('/sr-soft-eng', srSoftEngRouter)
allDevelopmentRouter.use('/sr-soft-eng', srSoftEngRouter)
allDevelopmentRouter.use('/php', phpRouter)
allDevelopmentRouter.use('/jr-flutter', jrFlutterRouter)
allDevelopmentRouter.use('/sr-flutter', srFlutterRouter)
allDevelopmentRouter.use('/android', srFlutterRouter)


export default allDevelopmentRouter;