import express from 'express'
import hrRouter from '../Other/HR/HrRoutes.js'

const allOtherRouter = express.Router()

allOtherRouter.use('/hr', hrRouter)

export default allOtherRouter