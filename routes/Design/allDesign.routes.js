import express from 'express'
import AuthMiddleware from '../../middlewares/verifyToken.js'
import digitalMarketingRouter from './DigitalMarketing/digitalMarketingRoutes.js'
import graphicRouter from './Graphic-CreativeHead/graphiRoutes.js'
import uiuxRouter from './UI-UX/uiUxRoutes.js'

const allDesignRouter = express.Router()

allDesignRouter.use('/digital-marketing',AuthMiddleware, digitalMarketingRouter)
allDesignRouter.use('/graphic',AuthMiddleware, graphicRouter)
allDesignRouter.use('/ui-ux',AuthMiddleware, uiuxRouter)

export default allDesignRouter