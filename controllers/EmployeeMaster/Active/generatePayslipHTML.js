import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";

// enable plugin
dayjs.extend(customParseFormat);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logoPath = path.resolve(__dirname, "./images/Logo1.svg");
const logoBase64 = fs.readFileSync(logoPath).toString("base64");

export const generatePayslipHTML = (employee, { employeeName }) => {
  // --- Format Date of Joining ---
  let formattedDOJ = "";

  if (employee.date_of_joining) {
    const possibleFormats = ["YYYY-MM-DD", "DD/MM/YYYY", "DD-MM-YYYY"];
    let parsedDate = null;

    for (const format of possibleFormats) {
      const d = dayjs(employee.date_of_joining, format, true);
      if (d.isValid()) {
        parsedDate = d;
        break;
      }
    }

    if (parsedDate) {
      formattedDOJ = parsedDate.format("DD MMMM YYYY"); // 👉 28 August 2025
    }
  }

  // --- Earnings Rows ---
  const earningsRows = Object.entries(employee.earnings || {})
    .map(
      ([key, val]) => `
        <tr class="border-b">
          <td class="p-2 font-semibold text-gray-600">${key}</td>
          <td class="p-2 text-right font-medium">
           ₹ ${Number(val || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </td>
        </tr>
      `
    )
    .join("");

  // --- Deductions Rows ---
  const deductionsRows = Object.entries(employee.deductions || {})
    .map(
      ([key, val]) => `
        <tr class="border-b">
          <td class="p-2 font-semibold text-gray-600">${key}</td>
          <td class="p-2 text-right font-medium">
           ₹ ${Number(val || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </td>
        </tr>
      `
    )
    .join("");

  // --- Return HTML ---
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Payslip</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="bg-gray-100">
   <div class="mx-auto shadow text-black font-sans"
     style="width:250mm; min-height:353mm; font-size:14px; color:#000; padding:10mm;">

      <!-- Header -->
      <div class="flex justify-between items-start border-b pb-4 ">
        <div class="flex gap-3 items-start">
          <img src="data:image/svg+xml;base64,${logoBase64}" alt="Logo" class="h-10 mt-4" />
          <div>
            <div class="font-bold text-lg text-gray-800">Metaphi Innovations Private Limited</div>
            <div class="text-sm text-gray-600 leading-snug">
              EXCEL PLAZA, 90 Feet Rd, Near Federal Bank, Saibaba Nagar, Pant Nagar,
            </div>
            <div class="text-sm text-gray-600 leading-snug">
              Ghatkopar East, Mumbai, Maharashtra 400075
            </div>
          </div>
        </div>

        <div class="text-right mt-4">
          <div class="font-medium text-gray-600 whitespace-nowrap">Payslip For the Month</div>
          <div class="text-lg font-bold text-black whitespace-nowrap">
            ${employee.payPeriod || ""}
          </div>
        </div>
      </div>

      <!-- Employee Summary + Net Pay -->
      <div class="flex flex-col md:flex-row gap-10 mt-6">
        <!-- Employee Summary -->
        <div class="w-full md:w-2/3">
          <div class="font-semibold text-gray-700 mb-4 uppercase">
            Employee Summary
          </div>

          <div class="space-y-2 font-medium text-gray-700 items-center">
            <div class="grid grid-cols-3 gap-1">
              <span class="font-semibold text-gray-600">Employee Name</span>
              <div class="flex items-center col-span-2">
                <span>:</span>
                <span class="text-black ml-5 text-[16px]">${employeeName || ""}</span>
              </div>
            </div>

            <div class="grid grid-cols-3 gap-1">
              <span class="text-[16px] text-gray-600">Employee ID</span>
              <div class="flex items-center col-span-2">
                <span>:</span>
                <span class="text-black ml-5 text-[16px]">${employee.employeeId || ""}</span>
              </div>
            </div>

            <div class="grid grid-cols-3 gap-1">
              <span class="text-[16px] text-gray-600">Date Of Joining</span>
              <div class="flex items-center col-span-2">
                <span>:</span>
                <span class="text-black ml-5 text-[16px]">${formattedDOJ}</span>
              </div>
            </div>

            <div class="grid grid-cols-3 gap-1">
              <span class="text-[16px] text-gray-600">Designation</span>
              <div class="flex items-center col-span-2">
                <span>:</span>
                <span class="text-black ml-5 text-[16px]">${employee.designation || ""}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Net Pay + Days -->
        <div class="w-full md:w-1/2 border border-gray-200 rounded-xl shadow-sm">
          <div class="bg-green-50 px-5 rounded-t-xl">
            <div class="flex items-center text-2xl font-bold text-black">
              <div class="w-1 h-14 bg-green-500 mr-3 rounded-full mt-3"></div>
             ₹ ${Number(employee.netPayable || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </div>
            <div class="relative bottom-5 font-medium text-gray-600 ml-4">
              Total Net Pay
            </div>
            <hr class="my-3 border-dotted border-gray-300" />
          </div>
          <div class="space-y-3 px-6 pb-4 text-sm text-gray-700">
            <div class="flex items-center gap-5">
              <span class="font-semibold text-gray-600">Paid Days</span>
              <span>:</span>
              <span class="text-black font-medium">${employee.paidDays || ""}</span>
            </div>
            <div class="flex items-center gap-5">
              <span class="font-semibold text-gray-600">LOP Days</span>
              <span class="w-1.5 text-right">:</span>
              <span class="text-black font-medium">${employee.lossOfPayDays ?? ""}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Earnings & Deductions -->
      <div class="grid grid-cols-2 gap-6 mt-6">
        <div>
          <table class="w-full border rounded text-sm">
            <thead class="bg-gray-200 border-b ">
              <tr>
                <th class="text-left p-2 ">EARNINGS</th>
                <th class="text-right p-2">AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              ${earningsRows}
              <tr class="font-semibold border-t" style="background-color: #eeededff;">
                <td class="p-2 font-medium">Gross Earnings</td>
                <td class="p-2 font-medium text-right">
                 ₹ ${Number(employee.grossEarnings || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <table class="w-full border rounded text-sm">
            <thead class="bg-gray-200 border-b">
              <tr>
                <th class="text-left p-2">DEDUCTIONS</th>
                <th class="text-right p-2">AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              ${deductionsRows}
              <tr class="font-semibold border-t" style="background-color: #eeededff;">
                <td class="p-2 font-medium">Total Deductions</td>
                <td class="p-2 font-medium text-right">
                 ₹ ${Number(employee.totalDeductions || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Net Pay Summary -->
      <div class="mt-6">
        <div class="border rounded-md flex justify-between items-stretch overflow-hidden">
          <div class="px-6 py-4">
            <div class="text-sm font-bold uppercase">Total Net Payable</div>
            <div class="text-xs text-gray-600">Gross Earnings - Total Deductions</div>
          </div>
          <div class="bg-green-50 px-6 py-6 text-right text-base font-bold text-black h-full flex items-center">
           ₹ ${Number(employee.netPayable || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </div>
        </div>

        <div class="border rounded-md px-6 py-4 mt-4 bg-gray-100">
          <span class="font-semibold text-gray-600">Amount in Words : </span>
          <span class="font-medium">${employee.netPayInWords || ""}</span>
        </div>
      </div>

      <!-- Footer -->
      <div class="mt-12 text-center text-xs text-gray-600 border-t pt-4">
        -- This is a system-generated document. --
      </div>
    </div>
  </body>
  </html>
  `;
};
