import express from 'express'
import hrRouter from '../Other/HR/HrRoutes.js'
import baRouter from '../Other/BA/BaRoutes.js'
import AuthMiddleware from '../../middlewares/verifyToken.js'
import bdRouter from '../Other/BD/BdRoutes.js'

const allOtherRouter = express.Router()

allOtherRouter.use('/hr',AuthMiddleware, hrRouter)
allOtherRouter.use('/ba',AuthMiddleware, baRouter)
allOtherRouter.use('/bd', AuthMiddleware, bdRouter)

export default allOtherRouter