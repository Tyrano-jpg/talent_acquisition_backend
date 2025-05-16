import express from 'express'

const allOtherRouter = express.Router()

allOtherRouter.use('/hr', allOtherRouter)

export default allOtherRouter