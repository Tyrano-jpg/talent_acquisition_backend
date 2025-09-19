
import { Router } from 'express';
import AuthMiddleware from '../../../middlewares/verifyToken.js';
import { MulterFunction } from '../../../config/multer/multer.js';

import {
  uploadEmployeePesonalDetailsDataAction,
  uploadEmploymentDetailsDataAction,
  uploadEmployeeBankDetailsDataAction,
  uploadEmployeeLeavePolicyDetailsDataAction,
} from '../../../controllers/EmployeeMaster/Active/active.controller.js';

import { listing_new_employeeMaster_action } from '../../../controllers/EmployeeMaster/Active/newEmployeePersonalDetails.controller.js';
import { generate_Salary_Slip } from '../../../controllers/EmployeeMaster/Active/salarySlip.controller.js';
import { listing_Salary_slip } from '../../../controllers/EmployeeMaster/Active/generateSalarySlip.controller.js';
import { editEmployeeBankDetailsDataAction, editEmployeeLeavePolicyDetailsDataAction, editEmployeePersonalDetailsAction, editEmploymentDetailsDataAction } from '../../../controllers/EmployeeMaster/Active/editActive.controller.js';
import { getSalarySlipsByEmpId } from '../../../controllers/EmployeeMaster/Active/getSalarySlip.controller.js';
import { sendMail_Salary_Slip } from '../../../controllers/EmployeeMaster/Active/salarySlipSendMail.controller.js';

const EmployeePersonalDetailsRouter = Router();

// List employees
EmployeePersonalDetailsRouter.post('/list', AuthMiddleware, listing_new_employeeMaster_action);
// salary slip generate
EmployeePersonalDetailsRouter.post('/list-salary-slip', AuthMiddleware, listing_Salary_slip);

// Upload Personal Details + File Upload
EmployeePersonalDetailsRouter.post('/upload-personal-details', AuthMiddleware, uploadEmployeePesonalDetailsDataAction);

// Upload Employment Details

EmployeePersonalDetailsRouter.post(
  '/upload-employee-details',
  AuthMiddleware,
  MulterFunction(`public/upload/pdf`).fields([
    { name: 'offer_letter' },
    { name: 'relieving_letter' },
    { name: 'termination_letter' },
    { name: 'internship_certificate' },
    { name: 'experience_letter' },
    { name: 'salary_slip' },
    // { name: 'employment_details', maxCount: 1 }, // 👈 Add this line

  ]),
  uploadEmploymentDetailsDataAction
);


// Upload Bank Details
EmployeePersonalDetailsRouter.post('/upload-bank-details', AuthMiddleware, uploadEmployeeBankDetailsDataAction);

// Upload Leave Policy Details
EmployeePersonalDetailsRouter.post('/upload-leave-policy-details', AuthMiddleware, uploadEmployeeLeavePolicyDetailsDataAction);


EmployeePersonalDetailsRouter.post('/upload-salary_slip', AuthMiddleware, generate_Salary_Slip);


EmployeePersonalDetailsRouter.post('/edit-personal-details/:_id', AuthMiddleware, editEmployeePersonalDetailsAction);

EmployeePersonalDetailsRouter.post('/edit-bank-details/:_id', AuthMiddleware, editEmployeeBankDetailsDataAction);

// EmployeePersonalDetailsRouter.post('/edit-employment-details/:_id', AuthMiddleware, editEmploymentDetailsDataAction);
EmployeePersonalDetailsRouter.post(
  '/edit-employment-details/:_id',
  AuthMiddleware,
  MulterFunction(`public/upload/pdf`).fields([
    { name: 'offer_letter' },
    { name: 'relieving_letter' },
    { name: 'termination_letter' },
    { name: 'internship_certificate' },
    { name: 'experience_letter' },
    { name: 'salary_slip' },
  ]),
  editEmploymentDetailsDataAction
);


EmployeePersonalDetailsRouter.post('/edit-leave-policy-details/:_id', AuthMiddleware, editEmployeeLeavePolicyDetailsDataAction);

EmployeePersonalDetailsRouter.post('/salary-slip-send-mail', AuthMiddleware,sendMail_Salary_Slip );


EmployeePersonalDetailsRouter.get("/salary-slip/:empid",AuthMiddleware, getSalarySlipsByEmpId);

export default EmployeePersonalDetailsRouter;
