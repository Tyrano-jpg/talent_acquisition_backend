const express=require('express')
const router=express.Router();
import { routesData } from './controller';
router.post("/routesData",routesData)

module.exports=router;