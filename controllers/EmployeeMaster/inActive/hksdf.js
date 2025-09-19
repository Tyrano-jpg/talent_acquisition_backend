// import employeesPersonalDetailsModel from "../../../database/schema/masters/EmployeePersonalDetails.schema.js";
// import catchAsync from "../../../utils/errors/catchAsync.js";

// // 1. Personal Details (CREATE)
// export const uploadEmployeePesonalDetailsDataAction = catchAsync(async (req, res) => {
//   let data = { ...req.body };

//   // Check uniqueness of personal email
//   const existingPersonalEmail = await employeesPersonalDetailsModel.findOne({
//     email_id: data.email_id,
//   });
//   if (existingPersonalEmail) {
//     return res.status(400).json({
//       status: false,
//       message: "Personal email (email_id) already exists.",
//     });
//   }

//   const savedApplication = await employeesPersonalDetailsModel.create(data);
//   return res.status(201).json({
//     status: true,
//     data: savedApplication,
//     message: "Employee personal details saved successfully!",
//   });
// });

// // 2. Employment Details (UPDATE)
// export const uploadEmploymentDetailsDataAction = catchAsync(async (req, res) => {
//   const { id } = req.query;

//   if (!id) {
//     return res.status(400).json({ status: false, message: "Employee ID is required." });
//   }

//   let { employment_details } = req.body;

//   // Parse employment_details JSON string before use
//   try {
//     employment_details = typeof employment_details === "string" ? JSON.parse(employment_details) : employment_details;
//   } catch (error) {
//     return res.status(400).json({
//       status: false,
//       message: "Invalid employment_details JSON format.",
//     });
//   }

//   // Uniqueness checks excluding current document
//   if (employment_details) {
//     const { official_email, empid } = employment_details;

//     if (official_email) {
//       const existingOfficialEmail = await employeesPersonalDetailsModel.findOne({
//         "employment_details.official_email": official_email,
//         _id: { $ne: id },
//       });
//       if (existingOfficialEmail) {
//         return res.status(400).json({
//           status: false,
//           message: "Official email already exists.",
//         });
//       }
//     }

//     if (empid) {
//       const existingEmpId = await employeesPersonalDetailsModel.findOne({
//         "employment_details.empid": empid,
//         _id: { $ne: id },
//       });
//       if (existingEmpId) {
//         return res.status(400).json({
//           status: false,
//           message: "Employee ID (empid) already exists.",
//         });
//       }
//     }
//   }

//   // Attach uploaded files to employment_details
//   const files = req.files || {};

//   if (files.offer_letter?.[0]) {
//     employment_details.offer_letter = files.offer_letter[0].filename;
//   }
//   if (files.relieving_letter?.[0]) {
//     employment_details.relieving_letter = files.relieving_letter[0].filename;
//   }
//   if (files.termination_letter?.[0]) {
//     employment_details.termination_letter = files.termination_letter[0].filename;
//   }
//   if (files.internship_certificate?.[0]) {
//     employment_details.internship_certificate = files.internship_certificate[0].filename;
//   }
//   if (files.experience_letter?.[0]) {
//     employment_details.experience_letter = files.experience_letter[0].filename;
//   }
//   if (files.salary_slip?.[0]) {
//     employment_details.salary_slip = files.salary_slip[0].filename;
//   }

//   // Update document
//   const updatedApplication = await employeesPersonalDetailsModel.findByIdAndUpdate(
//     id,
//     { $set: { employment_details } },
//     { new: true }
//   );

//   if (!updatedApplication) {
//     return res.status(404).json({ status: false, message: "Employee not found." });
//   }

//   return res.status(200).json({
//     status: true,
//     data: updatedApplication,
//     message: "Employment details updated successfully!",
//   });
// });

// // 3. Bank Details (UPDATE)
// export const uploadEmployeeBankDetailsDataAction = catchAsync(async (req, res) => {
//   const { id } = req.query;
//   let { bank_details } = req.body;

//   if (!id) {
//     return res.status(400).json({ status: false, message: "Employee ID is required." });
//   }
//   if (!bank_details) {
//     return res.status(400).json({ status: false, message: "bank_details is required." });
//   }

//   if (typeof bank_details === "string") {
//     try {
//       bank_details = JSON.parse(bank_details);
//       console.log("Parsed Bank Details:", bank_details);
//     } catch (error) {
//       return res.status(400).json({
//         status: false,
//         message: "Invalid format for bank_details. It should be a JSON string.",
//       });
//     }
//   }

//   const updatedApplication = await employeesPersonalDetailsModel.findByIdAndUpdate(
//     id,
//     { $set: { bank_details } },
//     { new: true }
//   );

//   if (!updatedApplication) {
//     return res.status(404).json({ status: false, message: "Employee not found." });
//   }

//   return res.status(200).json({
//     status: true,
//     data: updatedApplication,
//     message: "Bank details updated successfully!",
//   });
// });

// // 4. Leave Policy Details (UPDATE)
// export const uploadEmployeeLeavePolicyDetailsDataAction = catchAsync(async (req, res) => {
//   const { id } = req.query;
//   let { leave_balance_details } = req.body;

//   if (!id) {
//     return res.status(400).json({ status: false, message: "Employee ID is required." });
//   }
//   if (!leave_balance_details) {
//     return res.status(400).json({ status: false, message: "leave_balance_details is required." });
//   }

//   if (typeof leave_balance_details === "string") {
//     try {
//       leave_balance_details = JSON.parse(leave_balance_details);
//       console.log("Parsed Leave Balance Details:", leave_balance_details);
//     } catch (error) {
//       return res.status(400).json({
//         status: false,
//         message: "Invalid format for leave_balance_details. It should be a JSON string.",
//       });
//     }
//   }

//   const updatedApplication = await employeesPersonalDetailsModel.findByIdAndUpdate(
//     id,
//     { $set: { leave_balance_details } },
//     { new: true }
//   );

//   if (!updatedApplication) {
//     return res.status(404).json({ status: false, message: "Employee not found." });
//   }

//   return res.status(200).json({
//     status: true,
//     data: updatedApplication,
//     message: "Leave policy details updated successfully!",
//   });
// });















// import employeesPersonalDetailsModel from "../../../database/schema/masters/EmployeePersonalDetails.schema.js";
// import catchAsync from "../../../utils/errors/catchAsync.js";

// // 1. Personal Details (CREATE)
// export const uploadEmployeePesonalDetailsDataAction = catchAsync(async (req, res) => {
//   let data = { ...req.body };
//   // console.log("Personal Details Received:", data);

//   const savedApplication = await employeesPersonalDetailsModel.create(data);
//   return res.status(201).json({
//     status: true,
//     data: savedApplication,
//     message: "Employee personal details saved successfully!",
//   });
// });


// export const uploadEmploymentDetailsDataAction = catchAsync(async (req, res) => {
//   const { id } = req.query;
//   let { employment_details } = req.body;

//   if (!id) {
//     return res.status(400).json({ status: false, message: "Employee ID is required." });
//   }

//   // ✅ Parse the JSON string
//   try {
//     employment_details = JSON.parse(employment_details);
//   } catch (error) {
//     return res.status(400).json({
//       status: false,
//       message: "Invalid employment_details JSON format.",
//     });
//   }

//   // ✅ Attach uploaded files to employment_details
//   const files = req.files;

//   if (files.offer_letter?.[0]) {
//     employment_details.offer_letter = files.offer_letter[0].filename;
//   }
//   if (files.relieving_letter?.[0]) {
//     employment_details.relieving_letter = files.relieving_letter[0].filename;
//   }
//   if (files.termination_letter?.[0]) {
//     employment_details.termination_letter = files.termination_letter[0].filename;
//   }
//   if (files.internship_certificate?.[0]) {
//     employment_details.internship_certificate = files.internship_certificate[0].filename;
//   }
//   if (files.experience_letter?.[0]) {
//     employment_details.experience_letter = files.experience_letter[0].filename;
//   }
//   if (files.salary_slip?.[0]) {
//     employment_details.salary_slip = files.salary_slip[0].filename;
//   }

//   // ✅ Save to DB
//   const updatedApplication = await employeesPersonalDetailsModel.findByIdAndUpdate(
//     id,
//     { $set: { employment_details } },
//     { new: true }
//   );

//   if (!updatedApplication) {
//     return res.status(404).json({ status: false, message: "Employee not found." });
//   }

//   return res.status(200).json({
//     status: true,
//     data: updatedApplication,
//     message: "Employment details updated successfully!",
//   });
// });



// // 3. Bank Details (UPDATE)
// export const uploadEmployeeBankDetailsDataAction = catchAsync(async (req, res) => {
//   const { id } = req.query;
//   // let bank_details = req.body;
// let { bank_details } = req.body;

//   if (!id) {
//     return res.status(400).json({ status: false, message: "Employee ID is required." });
//   }
// if (!bank_details) {
//   return res.status(400).json({ status: false, message: "bank_details is required." });
// }
//   // ✅ Parse string to object
// if (typeof bank_details === "string") {
//   try {
//     bank_details = JSON.parse(bank_details);
//     console.log("Parsed Bank Details:", bank_details);
//   } catch (error) {
//     return res.status(400).json({
//       status: false,
//       message: "Invalid format for bank_details. It should be a JSON string.",
//     });
//   }
// }

//   // ✅ Update employee document with bank details
//   const updatedApplication = await employeesPersonalDetailsModel.findByIdAndUpdate(
//     id,
//     { $set: { bank_details } },
//     { new: true }
//   );

//   if (!updatedApplication) {
//     return res.status(404).json({ status: false, message: "Employee not found." });
//   }

//   return res.status(200).json({
//     status: true,
//     data: updatedApplication,
//     message: "Bank details updated successfully!",
//   });
// });

// // 4. Leave Policy Details (UPDATE)
// export const uploadEmployeeLeavePolicyDetailsDataAction = catchAsync(async (req, res) => {
//     const { id } = req.query;

//   const { leave_balance_details } = req.body;

//   if (!id) {
//     return res.status(400).json({ status: false, message: "Employee ID is required." });
//   }
// if (!leave_balance_details) {
//   return res.status(400).json({ status: false, message: "bank_details is required." });
// }
//   if (typeof leave_balance_details === "string") {
//   try {
//     leave_balance_details = JSON.parse(leave_balance_details);
//     console.log("Parsed Bank Details:", leave_balance_details);
//   } catch (error) {
//     return res.status(400).json({
//       status: false,
//       message: "Invalid format for leave_balance_details. It should be a JSON string.",
//     });
//   }
// }
//   const updatedApplication = await employeesPersonalDetailsModel.findByIdAndUpdate(
//     id,
//     { $set: { leave_balance_details } },
//     { new: true }
//   );

//   if (!updatedApplication) {
//     return res.status(404).json({ status: false, message: "Employee not found." });
//   }

//   return res.status(200).json({
//     status: true,
//     data: updatedApplication,
//     message: "Leave policy details updated successfully!",
//   });
// });














// import employeesPersonalDetailsModel from "../../../database/schema/masters/EmployeePersonalDetails.schema.js";
// import catchAsync from "../../../utils/errors/catchAsync.js";

// // UPDATE: Personal Details
// export const editEmployeePersonalDetailsAction = catchAsync(async (req, res) => {
//   const { _id } = req.params;
//   const updatedData = req.body;
//   console.log("Editing ID:", _id);
//   console.log("updatedData:", updatedData);
//   if (!_id) {
//     return res.status(400).json({ status: false, message: "Employee _ID is required." });
//   }

//   const updatedApplication = await employeesPersonalDetailsModel.findByIdAndUpdate(
//     _id,
//     { $set: updatedData },
//     { new: true }
//   );

//   if (!updatedApplication) {
//     return res.status(404).json({ status: false, message: "Employee not found." });
//   }

//   return res.status(200).json({
//     status: true,
//     data: updatedApplication,
//     message: "Employee personal details updated successfully!",
//   });
// });



// // UPDATE: Employment Details
// export const editEmploymentDetailsDataAction = catchAsync(async (req, res) => {
//   const { _id } = req.params;
// const { employment_details } = req.body;
// console.log("Received _id:", _id);
// console.log("Received employment_details:", employment_details);

//   if (!_id || !employment_details) {
//   return res.status(400).json({
//     status: false,
//     message: "Employee _id and employment_details are required.",
//   });
// }

//   // try {
//   //   employment_details = JSON.parse(employment_details);
//   // } catch (error) {
//   //   return res.status(400).json({
//   //     status: false,
//   //     message: "Inval_id format for employment_details. It should be JSON.",
//   //   });
//   // }

//   const updatedApplication = await employeesPersonalDetailsModel.findByIdAndUpdate(
//     _id,
//     { $set: {employment_details}},
//     { new: true }
//   );

// console.log(updatedApplication,"this is update application");

//   if (!updatedApplication) {
//     return res.status(404).json({ status: false, message: "Employee not found." });
//   }

//   return res.status(200).json({
//     status: true,
//     data: updatedApplication,
//     message: "Employment details updated successfully!",
//   });
// });

// // UPDATE: Bank Details
// export const editEmployeeBankDetailsDataAction = catchAsync(async (req, res) => {
//   const { _id } = req.params;
// const { bank_details } = req.body;

// if (!_id || !bank_details) {
//   return res.status(400).json({
//     status: false,
//     message: "Employee _id and bank_details are required.",
//   });
// }

// const updatedApplication = await employeesPersonalDetailsModel.findByIdAndUpdate(
//   _id,
//   { $set: { bank_details } },
//   { new: true }
// );

// console.log(updatedApplication,"this is update application");

//   if (!updatedApplication) {
//     return res.status(404).json({ status: false, message: "Employee not found." });
//   }

//   return res.status(200).json({
//     status: true,
//     data: updatedApplication,
//     message: "Bank details updated successfully!",
//   });
// });

// // UPDATE: Leave Policy Details
// export const editEmployeeLeavePolicyDetailsDataAction = catchAsync(async (req, res) => {
//   const { _id } = req.params;
// const { leave_balance_details } = req.body;

//   if (!_id|| !leave_balance_details) {
//     return res.status(400).json({ status: false, message: "Employee _ID and leave_balance_details is required." });
//   }



//   const updatedApplication = await employeesPersonalDetailsModel.findByIdAndUpdate(
//     _id,
//     { $set: {leave_balance_details}},
//     { new: true }
//   );
// console.log(updatedApplication,"this is update application");

//   if (!updatedApplication) {
//     return res.status(404).json({ status: false, message: "Employee not found." });
//   }

//   return res.status(200).json({
//     status: true,
//     data: updatedApplication,
//     message: "Leave policy details updated successfully!",
//   });
// });



//  <div className="px-6 py-4">
//               <div className="text-sm font-bold uppercase">Total Net Payable</div>
//               <div className="text-xs text-gray-500">Gross Earnings - Total Deductions</div>
//             </div>





// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const logoPath = path.resolve(__dirname, "./images/Logo1.svg");
// const logoBase64 = fs.readFileSync(logoPath).toString("base64");

// export const generatePayslipHTML = (employee, { employeeName }) => {
//   const earningsRows = Object.entries(employee.earnings || {})
//     .map(
//       ([key, val]) => `
//         <tr class="border-b">
//           <td class="p-2 font-medium text-gray-500">${key}</td>
//           <td class="p-2 text-right font-medium">
//             Rs. ${Number(val || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
//           </td>
//         </tr>
//       `
//     )
//     .join("");

//   const deductionsRows = Object.entries(employee.deductions || {})
//     .map(
//       ([key, val]) => `
//         <tr class="border-b">
//           <td class="p-2 font-medium text-gray-500">${key}</td>
//           <td class="p-2 text-right font-medium">
//             Rs. ${Number(val || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
//           </td>
//         </tr>
//       `
//     )
//     .join("");

//   return `
//   <!DOCTYPE html>
//   <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <script src="https://cdn.tailwindcss.com"></script>
//   </head>
//   <body>
//     <div class=" text-black font-['Arial,Helvetica,sans-serif']"
//          style="width:250mm; min-height:297mm; font-size:14px; color:#000; padding:10mm;">

//       <!-- Header -->
//       <div class="flex justify-between items-start border-b pb-4 bg-white">
//         <div class="flex gap-3 items-start">
//           <img src="data:image/svg+xml;base64,${logoBase64}" alt="Logo" class="h-10 mt-4" />
//           <div>
//             <div class="font-bold text-lg text-gray-800">Metaphi Innovations Private Limited</div>
//             <div class="text-sm text-gray-500 leading-snug">
//               EXCEL PLAZA, 90 Feet Rd, Near Federal Bank, Saibaba Nagar, Pant Nagar,
//             </div>
//             <div class="text-sm text-gray-500 leading-snug">
//               Ghatkopar East, Mumbai, Maharashtra 400075
//             </div>
//           </div>
//         </div>
//         <div class="text-right mt-4">
//           <div class="font-medium text-gray-500 whitespace-nowrap">Payslip For the Month</div>
//           <div class="text-lg font-bold text-black whitespace-nowrap">${employee.payPeriod || ""}</div>
//         </div>
//       </div>

//       <!-- Employee Summary + Net Pay -->
//       <div class="flex flex-col md:flex-row gap-10 mt-6">
//         <!-- Employee Summary -->
//         <div class="w-full md:w-2/3">
//           <div class="font-semibold text-gray-600 mb-4 uppercase">Employee Summary</div>
//           <div class="space-y-2 font-medium text-gray-700 items-center">
//             ${[
//               ["Employee Name", employeeName],
//               ["Employee ID", employee.employeeId],
//               ["Pay Period", employee.payPeriod],
//               ["Pay Date", employee.payDate],
//             ]
//               .map(
//                 ([label, val]) => `
//                 <div class="grid grid-cols-3 gap-1">
//                   <span class="text-[16px] text-gray-500">${label}</span>
//                   <div class="flex items-center col-span-2">
//                     <span>:</span>
//                     <span class="text-black ml-5 text-[16px]">${val || ""}</span>
//                   </div>
//                 </div>
//               `
//               )
//               .join("")}
//           </div>
//         </div>

//         <!-- Net Pay -->
//         <div class="w-full md:w-1/2 border border-gray-200 rounded-xl shadow-sm">
//           <div class="bg-green-50 px-5 rounded-t-xl">
//             <div class="flex items-center text-2xl font-bold text-black">
//               <div class="w-1 h-14 bg-green-500 mr-3 rounded-full mt-3"></div>
//               Rs. ${(employee.netPayable || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
//             </div>
//             <div class="relative bottom-5 font-medium text-gray-600 ml-4">Total Net Pay</div>
//             <hr class="my-3 border-dotted border-gray-300" />
//           </div>
//           <div class="space-y-3 px-6 pb-4 text-sm text-gray-700">
//             <div class="flex items-center gap-5">
//               <span class="font-medium text-gray-500">Paid Days</span>
//               <span>:</span>
//               <span class="text-black font-medium">${employee.paidDays || ""}</span>
//             </div>
//             <div class="flex items-center gap-5">
//               <span class="font-medium text-gray-500">LOP Days</span>
//               <span>:</span>
//               <span class="text-black font-medium">${employee.lossOfPayDays || ""}</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <!-- Earnings & Deductions -->
//       <div class="grid grid-cols-2 gap-6 mt-6">
//         <div>
//           <table class="w-full border rounded text-sm">
//             <thead class="bg-gray-100 border-b">
//               <tr><th class="text-left p-2">EARNINGS</th><th class="text-right p-2">AMOUNT</th></tr>
//             </thead>
//             <tbody>
//               ${earningsRows}
//               <tr class="font-semibold bg-gray-50 border-t">
//                 <td class="p-2 font-medium">Gross Earnings</td>
//                 <td class="p-2 font-medium text-right">Rs. ${(employee.grossEarnings || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//         <div>
//           <table class="w-full border rounded text-sm">
//             <thead class="bg-gray-100 border-b">
//               <tr><th class="text-left p-2">DEDUCTIONS</th><th class="text-right p-2">AMOUNT</th></tr>
//             </thead>
//             <tbody>
//               ${deductionsRows}
//               <tr class="font-semibold bg-gray-50 border-t">
//                 <td class="p-2 font-medium">Total Deductions</td>
//                 <td class="p-2 font-medium text-right">Rs. ${(employee.totalDeductions || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <!-- Net Pay Summary -->
//       <div class="mt-6">
//         <div class="border rounded-md flex justify-between items-stretch overflow-hidden">
//           <div class="px-6 py-4">
//             <div class="text-sm font-bold uppercase">Total Net Payable</div>
//             <div class="text-gray-500">Gross Earnings - Total Deductions</div>
//           </div>
//           <div class="bg-green-50 px-6 py-6 text-right text-base font-bold text-black h-full flex items-center">
//             Rs. ${(employee.netPayable || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
//           </div>
//         </div>
//         <div class="border rounded-md bg-gray-50 px-6 py-4 mt-4">
//           <span class="font-medium text-gray-500">Amount in Words: </span>
//           <span class="font-medium">${employee.netPayInWords || ""}</span>
//         </div>
//       </div>

//       <!-- Footer -->
//       <div class="mt-12 text-center text-xs text-gray-500 border-t pt-4">
//         -- This is a system-generated document. --
//       </div>
//     </div>
//   </body>
//   </html>`;
// };


// import employeesPersonalDetailsModel from "../../../database/schema/masters/EmployeePersonalDetails.schema.js";
// import catchAsync from "../../../utils/errors/catchAsync.js";

// // 1. Personal Details (CREATE)
// export const uploadEmployeePesonalDetailsDataAction = catchAsync(async (req, res) => {
//   let data = { ...req.body };

//   // Check uniqueness of personal email
//   const existingPersonalEmail = await employeesPersonalDetailsModel.findOne({
//     email_id: data.email_id,
//   });
//   if (existingPersonalEmail) {
//     return res.status(400).json({
//       status: false,
//       message: "Personal email (email_id) already exists.",
//     });
//   }

//   const savedApplication = await employeesPersonalDetailsModel.create(data);
//   return res.status(201).json({
//     status: true,
//     data: savedApplication,
//     message: "Employee personal details saved successfully!",
//   });
// });

// // 2. Employment Details (UPDATE)
// export const uploadEmploymentDetailsDataAction = catchAsync(async (req, res) => {
//   const { id } = req.query;

//   if (!id) {
//     return res.status(400).json({ status: false, message: "Employee ID is required." });
//   }

//   let { employment_details } = req.body;

//   // Parse employment_details JSON string before use
//   try {
//     employment_details = typeof employment_details === "string" ? JSON.parse(employment_details) : employment_details;
//   } catch (error) {
//     return res.status(400).json({
//       status: false,
//       message: "Invalid employment_details JSON format.",
//     });
//   }

//   // Uniqueness checks excluding current document
//   if (employment_details) {
//     const { official_email, empid } = employment_details;

//     if (official_email) {
//       const existingOfficialEmail = await employeesPersonalDetailsModel.findOne({
//         "employment_details.official_email": official_email,
//         _id: { $ne: id },
//       });
//       if (existingOfficialEmail) {
//         return res.status(400).json({
//           status: false,
//           message: "Official email already exists.",
//         });
//       }
//     }

//     if (empid) {
//       const existingEmpId = await employeesPersonalDetailsModel.findOne({
//         "employment_details.empid": empid,
//         _id: { $ne: id },
//       });
//       if (existingEmpId) {
//         return res.status(400).json({
//           status: false,
//           message: "Employee ID (empid) already exists.",
//         });
//       }
//     }
//   }

//   // Attach uploaded files to employment_details
//   const files = req.files || {};

//   if (files.offer_letter?.[0]) {
//     employment_details.offer_letter = files.offer_letter[0].filename;
//   }
//   if (files.relieving_letter?.[0]) {
//     employment_details.relieving_letter = files.relieving_letter[0].filename;
//   }
//   if (files.termination_letter?.[0]) {
//     employment_details.termination_letter = files.termination_letter[0].filename;
//   }
//   if (files.internship_certificate?.[0]) {
//     employment_details.internship_certificate = files.internship_certificate[0].filename;
//   }
//   if (files.experience_letter?.[0]) {
//     employment_details.experience_letter = files.experience_letter[0].filename;
//   }
//   if (files.salary_slip?.[0]) {
//     employment_details.salary_slip = files.salary_slip[0].filename;
//   }

//   // Update document
//   const updatedApplication = await employeesPersonalDetailsModel.findByIdAndUpdate(
//     id,
//     { $set: { employment_details } },
//     { new: true }
//   );

//   if (!updatedApplication) {
//     return res.status(404).json({ status: false, message: "Employee not found." });
//   }

//   return res.status(200).json({
//     status: true,
//     data: updatedApplication,
//     message: "Employment details updated successfully!",
//   });
// });

// // 3. Bank Details (UPDATE)
// export const uploadEmployeeBankDetailsDataAction = catchAsync(async (req, res) => {
//   const { id } = req.query;
//   let { bank_details } = req.body;

//   if (!id) {
//     return res.status(400).json({ status: false, message: "Employee ID is required." });
//   }
//   if (!bank_details) {
//     return res.status(400).json({ status: false, message: "bank_details is required." });
//   }

//   if (typeof bank_details === "string") {
//     try {
//       bank_details = JSON.parse(bank_details);
//       console.log("Parsed Bank Details:", bank_details);
//     } catch (error) {
//       return res.status(400).json({
//         status: false,
//         message: "Invalid format for bank_details. It should be a JSON string.",
//       });
//     }
//   }

//   const updatedApplication = await employeesPersonalDetailsModel.findByIdAndUpdate(
//     id,
//     { $set: { bank_details } },
//     { new: true }
//   );

//   if (!updatedApplication) {
//     return res.status(404).json({ status: false, message: "Employee not found." });
//   }

//   return res.status(200).json({
//     status: true,
//     data: updatedApplication,
//     message: "Bank details updated successfully!",
//   });
// });

// // 4. Leave Policy Details (UPDATE)
// export const uploadEmployeeLeavePolicyDetailsDataAction = catchAsync(async (req, res) => {
//   const { id } = req.query;
//   let { leave_balance_details } = req.body;

//   if (!id) {
//     return res.status(400).json({ status: false, message: "Employee ID is required." });
//   }
//   if (!leave_balance_details) {
//     return res.status(400).json({ status: false, message: "leave_balance_details is required." });
//   }

//   if (typeof leave_balance_details === "string") {
//     try {
//       leave_balance_details = JSON.parse(leave_balance_details);
//       console.log("Parsed Leave Balance Details:", leave_balance_details);
//     } catch (error) {
//       return res.status(400).json({
//         status: false,
//         message: "Invalid format for leave_balance_details. It should be a JSON string.",
//       });
//     }
//   }

//   const updatedApplication = await employeesPersonalDetailsModel.findByIdAndUpdate(
//     id,
//     { $set: { leave_balance_details } },
//     { new: true }
//   );

//   if (!updatedApplication) {
//     return res.status(404).json({ status: false, message: "Employee not found." });
//   }

//   return res.status(200).json({
//     status: true,
//     data: updatedApplication,
//     message: "Leave policy details updated successfully!",
//   });
// });















// import employeesPersonalDetailsModel from "../../../database/schema/masters/EmployeePersonalDetails.schema.js";
// import catchAsync from "../../../utils/errors/catchAsync.js";

// // 1. Personal Details (CREATE)
// export const uploadEmployeePesonalDetailsDataAction = catchAsync(async (req, res) => {
//   let data = { ...req.body };
//   // console.log("Personal Details Received:", data);

//   const savedApplication = await employeesPersonalDetailsModel.create(data);
//   return res.status(201).json({
//     status: true,
//     data: savedApplication,
//     message: "Employee personal details saved successfully!",
//   });
// });


// export const uploadEmploymentDetailsDataAction = catchAsync(async (req, res) => {
//   const { id } = req.query;
//   let { employment_details } = req.body;

//   if (!id) {
//     return res.status(400).json({ status: false, message: "Employee ID is required." });
//   }

//   // ✅ Parse the JSON string
//   try {
//     employment_details = JSON.parse(employment_details);
//   } catch (error) {
//     return res.status(400).json({
//       status: false,
//       message: "Invalid employment_details JSON format.",
//     });
//   }

//   // ✅ Attach uploaded files to employment_details
//   const files = req.files;

//   if (files.offer_letter?.[0]) {
//     employment_details.offer_letter = files.offer_letter[0].filename;
//   }
//   if (files.relieving_letter?.[0]) {
//     employment_details.relieving_letter = files.relieving_letter[0].filename;
//   }
//   if (files.termination_letter?.[0]) {
//     employment_details.termination_letter = files.termination_letter[0].filename;
//   }
//   if (files.internship_certificate?.[0]) {
//     employment_details.internship_certificate = files.internship_certificate[0].filename;
//   }
//   if (files.experience_letter?.[0]) {
//     employment_details.experience_letter = files.experience_letter[0].filename;
//   }
//   if (files.salary_slip?.[0]) {
//     employment_details.salary_slip = files.salary_slip[0].filename;
//   }

//   // ✅ Save to DB
//   const updatedApplication = await employeesPersonalDetailsModel.findByIdAndUpdate(
//     id,
//     { $set: { employment_details } },
//     { new: true }
//   );

//   if (!updatedApplication) {
//     return res.status(404).json({ status: false, message: "Employee not found." });
//   }

//   return res.status(200).json({
//     status: true,
//     data: updatedApplication,
//     message: "Employment details updated successfully!",
//   });
// });



// // 3. Bank Details (UPDATE)
// export const uploadEmployeeBankDetailsDataAction = catchAsync(async (req, res) => {
//   const { id } = req.query;
//   // let bank_details = req.body;
// let { bank_details } = req.body;

//   if (!id) {
//     return res.status(400).json({ status: false, message: "Employee ID is required." });
//   }
// if (!bank_details) {
//   return res.status(400).json({ status: false, message: "bank_details is required." });
// }
//   // ✅ Parse string to object
// if (typeof bank_details === "string") {
//   try {
//     bank_details = JSON.parse(bank_details);
//     console.log("Parsed Bank Details:", bank_details);
//   } catch (error) {
//     return res.status(400).json({
//       status: false,
//       message: "Invalid format for bank_details. It should be a JSON string.",
//     });
//   }
// }

//   // ✅ Update employee document with bank details
//   const updatedApplication = await employeesPersonalDetailsModel.findByIdAndUpdate(
//     id,
//     { $set: { bank_details } },
//     { new: true }
//   );

//   if (!updatedApplication) {
//     return res.status(404).json({ status: false, message: "Employee not found." });
//   }

//   return res.status(200).json({
//     status: true,
//     data: updatedApplication,
//     message: "Bank details updated successfully!",
//   });
// });

// // 4. Leave Policy Details (UPDATE)
// export const uploadEmployeeLeavePolicyDetailsDataAction = catchAsync(async (req, res) => {
//     const { id } = req.query;

//   const { leave_balance_details } = req.body;

//   if (!id) {
//     return res.status(400).json({ status: false, message: "Employee ID is required." });
//   }
// if (!leave_balance_details) {
//   return res.status(400).json({ status: false, message: "bank_details is required." });
// }
//   if (typeof leave_balance_details === "string") {
//   try {
//     leave_balance_details = JSON.parse(leave_balance_details);
//     console.log("Parsed Bank Details:", leave_balance_details);
//   } catch (error) {
//     return res.status(400).json({
//       status: false,
//       message: "Invalid format for leave_balance_details. It should be a JSON string.",
//     });
//   }
// }
//   const updatedApplication = await employeesPersonalDetailsModel.findByIdAndUpdate(
//     id,
//     { $set: { leave_balance_details } },
//     { new: true }
//   );

//   if (!updatedApplication) {
//     return res.status(404).json({ status: false, message: "Employee not found." });
//   }

//   return res.status(200).json({
//     status: true,
//     data: updatedApplication,
//     message: "Leave policy details updated successfully!",
//   });
// });














// import employeesPersonalDetailsModel from "../../../database/schema/masters/EmployeePersonalDetails.schema.js";
// import catchAsync from "../../../utils/errors/catchAsync.js";

// // UPDATE: Personal Details
// export const editEmployeePersonalDetailsAction = catchAsync(async (req, res) => {
//   const { _id } = req.params;
//   const updatedData = req.body;
//   console.log("Editing ID:", _id);
//   console.log("updatedData:", updatedData);
//   if (!_id) {
//     return res.status(400).json({ status: false, message: "Employee _ID is required." });
//   }

//   const updatedApplication = await employeesPersonalDetailsModel.findByIdAndUpdate(
//     _id,
//     { $set: updatedData },
//     { new: true }
//   );

//   if (!updatedApplication) {
//     return res.status(404).json({ status: false, message: "Employee not found." });
//   }

//   return res.status(200).json({
//     status: true,
//     data: updatedApplication,
//     message: "Employee personal details updated successfully!",
//   });
// });



// // UPDATE: Employment Details
// export const editEmploymentDetailsDataAction = catchAsync(async (req, res) => {
//   const { _id } = req.params;
// const { employment_details } = req.body;
// console.log("Received _id:", _id);
// console.log("Received employment_details:", employment_details);

//   if (!_id || !employment_details) {
//   return res.status(400).json({
//     status: false,
//     message: "Employee _id and employment_details are required.",
//   });
// }

//   // try {
//   //   employment_details = JSON.parse(employment_details);
//   // } catch (error) {
//   //   return res.status(400).json({
//   //     status: false,
//   //     message: "Inval_id format for employment_details. It should be JSON.",
//   //   });
//   // }

//   const updatedApplication = await employeesPersonalDetailsModel.findByIdAndUpdate(
//     _id,
//     { $set: {employment_details}},
//     { new: true }
//   );

// console.log(updatedApplication,"this is update application");

//   if (!updatedApplication) {
//     return res.status(404).json({ status: false, message: "Employee not found." });
//   }

//   return res.status(200).json({
//     status: true,
//     data: updatedApplication,
//     message: "Employment details updated successfully!",
//   });
// });

// // UPDATE: Bank Details
// export const editEmployeeBankDetailsDataAction = catchAsync(async (req, res) => {
//   const { _id } = req.params;
// const { bank_details } = req.body;

// if (!_id || !bank_details) {
//   return res.status(400).json({
//     status: false,
//     message: "Employee _id and bank_details are required.",
//   });
// }

// const updatedApplication = await employeesPersonalDetailsModel.findByIdAndUpdate(
//   _id,
//   { $set: { bank_details } },
//   { new: true }
// );

// console.log(updatedApplication,"this is update application");

//   if (!updatedApplication) {
//     return res.status(404).json({ status: false, message: "Employee not found." });
//   }

//   return res.status(200).json({
//     status: true,
//     data: updatedApplication,
//     message: "Bank details updated successfully!",
//   });
// });

// // UPDATE: Leave Policy Details
// export const editEmployeeLeavePolicyDetailsDataAction = catchAsync(async (req, res) => {
//   const { _id } = req.params;
// const { leave_balance_details } = req.body;

//   if (!_id|| !leave_balance_details) {
//     return res.status(400).json({ status: false, message: "Employee _ID and leave_balance_details is required." });
//   }



//   const updatedApplication = await employeesPersonalDetailsModel.findByIdAndUpdate(
//     _id,
//     { $set: {leave_balance_details}},
//     { new: true }
//   );
// console.log(updatedApplication,"this is update application");

//   if (!updatedApplication) {
//     return res.status(404).json({ status: false, message: "Employee not found." });
//   }

//   return res.status(200).json({
//     status: true,
//     data: updatedApplication,
//     message: "Leave policy details updated successfully!",
//   });
// });



//  <div className="px-6 py-4">
//               <div className="text-sm font-bold uppercase">Total Net Payable</div>
//               <div className="text-xs text-gray-500">Gross Earnings - Total Deductions</div>
//             </div>


//  import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const logoPath = path.resolve(__dirname, "./images/Logo1.svg");
// const logoBase64 = fs.readFileSync(logoPath).toString("base64");

// export const generatePayslipHTML = (employee, { employeeName }) => {
//   const earningsRows = Object.entries(employee.earnings || {})
//     .map(
//       ([key, val]) => `
//         <tr class="border-b">
//           <td class="p-2 font-medium text-gray-500">${key}</td>
//           <td class="p-2 text-right  font-medium">Rs.${val}</td>
//         </tr>
//       `
//     )
//     .join("");

//   const deductionsRows = Object.entries(employee.deductions || {})
//     .map(
//       ([key, val]) => `
//         <tr class="border-b">
//           <td class="p-2 font-medium text-gray-500 ">${key}</td>
//           <td class="p-2 text-right  font-medium">Rs.${val}</td>
//         </tr>
//       `
//     )
//     .join("");

//   return `
//   <!DOCTYPE html>
//   <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <title>Payslip</title>
//     <script src="https://cdn.tailwindcss.com"></script>
//   </head>
//   <body >
//     <div class=" text-black font-['Arial,Helvetica,sans-serif']"
//          style="width:250mm; min-height:297mm; font-size:14px; color:#000; padding:10mm;">

//       <!-- Header -->
//       <div class="flex justify-between items-start border-b pb-4 bg-white">
//         <!-- Left side logo + company -->
//         <div class="flex gap-3 items-start">
//           <img src="data:image/svg+xml;base64,${logoBase64}" alt="Logo" class="h-10 mt-4" />
//           <div>
//             <div class="font-bold text-lg text-gray-800">Metaphi Innovations Private Limited</div>
//             <div class="text-sm text-gray-600 leading-snug">
//                 EXCEL PLAZA, 90 Feet Rd, Near Federal Bank, Saibaba Nagar, Pant Nagar,
//             </div>
//             <div class="text-sm text-gray-600 leading-snug">
//             Ghatkopar East, Mumbai, Maharashtra 400075
//             </div>
//           </div>
//         </div>

//         <div class="text-right mt-4">
//           <div class="font-medium text-gray-500 whitespace-nowrap">Payslip For the Month</div>
//           <div class="text-lg font-bold text-black whitespace-nowrap">
//             ${employee.payPeriod || ""}
//           </div>
//         </div>
//       </div>

//       <!-- Employee Summary + Net Pay -->
//       <div class="flex flex-col md:flex-row gap-10 mt-6">
//         <!-- Employee Summary -->
//         <div class="w-full md:w-2/3">
//           <div class="font-semibold text-gray-600 mb-4 uppercase">
//             Employee Summary
//           </div>

//           <div class="space-y-2 font-medium text-gray-700 items-center">
//             <div class="grid grid-cols-3 gap-1">
//               <span class="text-[16px] text-gray-500">Employee Name</span>
//               <div class="flex items-center col-span-2">
//                 <span>:</span>
//                 <span class="text-black ml-5 text-[16px]">${employeeName || ""}</span>
//               </div>
//             </div>

//             <div class="grid grid-cols-3 gap-1">
//               <span class="text-[16px] text-gray-500">Employee ID</span>
//               <div class="flex items-center col-span-2">
//                 <span>:</span>
//                 <span class="text-black ml-5 text-[16px]">${employee.employeeId || ""}</span>
//               </div>
//             </div>

//             <div class="grid grid-cols-3 gap-1">
//               <span class="text-[16px] text-gray-500">Pay Period</span>
//               <div class="flex items-center col-span-2">
//                 <span>:</span>
//                 <span class="text-black ml-5 text-[16px]">${employee.payPeriod || ""}</span>
//               </div>
//             </div>

//             <div class="grid grid-cols-3 gap-1">
//               <span class="text-[16px] text-gray-500">Pay Date</span>
//               <div class="flex items-center col-span-2">
//                 <span>:</span>
//                 <span class="text-black ml-5 text-[16px]">${employee.payDate || ""}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         <!-- Net Pay + Days -->
//         <div class="w-full md:w-1/2 border border-gray-200 rounded-xl shadow-sm">
//           <div class="bg-green-50 px-5 rounded-t-xl">
//             <div class="flex items-center text-2xl font-bold text-black">
//               <div class="w-1 h-14 bg-green-500 mr-3 rounded-full mt-3"></div>
//               Rs.${(employee.netPayable || 0).toFixed(2)}
//             </div>
//             <div class="relative bottom-5 font-medium text-gray-600 ml-4">
//               Total Net Pay <span class=" text-green-500 ml-3">✔</span>
//             </div>
//             <hr class="my-3 border-dotted border-gray-300" />

//           </div>
//           <div class="space-y-3 px-6 pb-4 text-sm text-gray-700">
//             <div class="flex items-center gap-5">
//               <span class="font-medium text-gray-500">Paid Days</span>
//               <span>:</span>
//               <span class="text-black ">${employee.paidDays || ""}</span>
//             </div>
//             <div class="flex items-center gap-5">
//               <span class="font-medium text-gray-500">LOP Days</span>
//               <span>:</span>
//               <span class="text-black">${employee.lossOfPayDays || ""}</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <!-- Earnings & Deductions -->
//       <div class="grid grid-cols-2 gap-6 mt-6">
//         <div>
//           <table class="w-full border rounded text-sm">
//             <thead class="bg-gray-100 border-b">
//               <tr>
//                 <th class="text-left p-2">EARNINGS</th>
//                 <th class="text-right p-2">AMOUNT</th>
//               </tr>
//             </thead>
//             <tbody>
//               ${earningsRows}
//               <tr class="font-semibold bg-gray-50 border-t">
//                 <td class="p-2 font-medium">Gross Earnings</td>
//                 <td class="p-2 font-medium text-right">Rs.${(employee.grossEarnings || 0).toFixed(2)}</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>

//         <div>
//           <table class="w-full border rounded text-sm">
//             <thead class="bg-gray-100 border-b">
//               <tr>
//                 <th class="text-left p-2">DEDUCTIONS</th>
//                 <th class="text-right p-2">AMOUNT</th>
//               </tr>
//             </thead>
//             <tbody>
//               ${deductionsRows}
//               <tr class="font-semibold bg-gray-50 border-t">
//                 <td class="p-2">Total Deductions</td>
//                 <td class="p-2 text-right">Rs.${(employee.totalDeductions || 0).toFixed(2)}</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <!-- Net Pay Summary -->
//       <div class="mt-6">
//         <div class="border rounded-md flex justify-between items-stretch overflow-hidden">
//           <div class="px-6 py-4">
//             <div class="text-sm font-bold uppercase">Total Net Payable</div>
//             <div class="text-xs text-gray-500">Gross Earnings - Total Deductions</div>
//           </div>
//           <div style="background-color:#ecfdf5; padding:12px 18px; text-align:right;
//             font-size:16px; font-weight:bold; color:#000; display:flex;
//             align-items:center; height:100%;">
//   Rs.${(employee.netPayable || 0).toFixed(2)}
// </div>

//         </div>

//         <!-- Amount in Words -->
//         <div class="border rounded-md bg-gray-50 px-6 py-4 mt-4">
//           <span>Amount in Words: </span>
//           <span class="font-bold">${employee.netPayInWords || ""}</span>
//         </div>
//       </div>

//       <!-- Footer -->
//       <div class="mt-12 text-center text-xs text-gray-500 border-t pt-4">
//         -- This is a system-generated document. --
//       </div>
//     </div>
//   </body>
//   </html>
//   `;
// };


