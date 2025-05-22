import express from 'express'
import AuthMiddleware from '../../middlewares/verifyToken.js'
import devOpsRouter from './DevOps/devOpsRoutes.js'
import qaRouter from './QA/qaRoutes.js'

const allDeploymentRouter = express.Router()

allDeploymentRouter.use('/devops',AuthMiddleware, devOpsRouter)
allDeploymentRouter.use('/qa',AuthMiddleware, qaRouter)

export default allDeploymentRouter