import EmployeePersonalDetailsRouter from "./Active/activeRoutes.js";
import express from 'express';


const allEmployeeMasterRouter = express.Router();

allEmployeeMasterRouter.use('/active-Employeedata', EmployeePersonalDetailsRouter)



export default allEmployeeMasterRouter;
