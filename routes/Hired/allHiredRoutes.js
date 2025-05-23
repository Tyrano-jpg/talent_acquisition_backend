import express from 'express'
import AuthMiddleware from '../../middlewares/verifyToken.js'
import hiredRouter from './hiredroute.js'

const allHiredtRouter = express.Router()

allHiredtRouter.use('/list',AuthMiddleware, hiredRouter)

export default allHiredtRouter