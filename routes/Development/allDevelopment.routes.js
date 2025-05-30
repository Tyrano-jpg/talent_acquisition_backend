import express from 'express';
import srMernRouter from './SrMern/srMernRoutes.js';
import jrMernRouter from './JrMern/jrMernRoutes.js';
import jrSoftEngRouter from './JrSoftEng/jrSoftEngRoutes.js';
import srSoftEngRouter from './SrSoftEng/srSoftEngRoutes.js';
import phpRouter from './Php/phpRoutes.js';
import jrFlutterRouter from './JrFlutterDev/jrFlutterRoutes.js';
import srFlutterRouter from './SrFlutterDev/srFlutterRoutes.js';
import androidRouter from './AndroidDev/androidRoutes.js';
import iosRouter from './IOSDev/iosRoutes.js';
import leadArchitectRouter from './LeadArchitect/leadArchitectRoutes.js';
import aiDevRouter from './AiDev/aiDevRoutes.js';

const allDevelopmentRouter = express.Router();

allDevelopmentRouter.use('/sr-mern', srMernRouter)
allDevelopmentRouter.use('/jr-mern', jrMernRouter)
allDevelopmentRouter.use('/jr-soft-eng', jrSoftEngRouter)
allDevelopmentRouter.use('/sr-soft-eng', srSoftEngRouter)
allDevelopmentRouter.use('/php', phpRouter)
allDevelopmentRouter.use('/jr-flutter', jrFlutterRouter)
allDevelopmentRouter.use('/sr-flutter', srFlutterRouter)
allDevelopmentRouter.use('/android', androidRouter)
allDevelopmentRouter.use('/ios', iosRouter)
allDevelopmentRouter.use('/lead-architect', leadArchitectRouter)
allDevelopmentRouter.use('/ai-dev', aiDevRouter)


export default allDevelopmentRouter;