import express from 'express'
import hrRouter from '../Other/HR/HrRoutes.js'
import baRouter from '../Other/BA/BaRoutes.js'

const allOtherRouter = express.Router()

allOtherRouter.use('/hr', hrRouter)
allOtherRouter.use('/ba', baRouter)

export default allOtherRouter