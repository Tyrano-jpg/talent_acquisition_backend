import employeesSalarySlip from "../../../database/schema/masters/salarySlip.schema.js";
import catchAsync from "../../../utils/errors/catchAsync.js";
import nodemailer from "nodemailer";
import puppeteer from "puppeteer";
import dotenv from 'dotenv/config'
import { generatePayslipHTML } from "./generatePayslipHTML.js";
const createPdfBuffer = async (html) => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });
  // const pdfBuffer = await page.pdf({ format: "A4" });
    const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,   // ✅ This enables background colors/images
  });
  await browser.close();
  return pdfBuffer;
};

export const sendMail_Salary_Slip = catchAsync(async (req, res) => {
  const { employeeEmail, employeeName,  fileName, ...dbData } = req.body;
  const html=generatePayslipHTML(dbData,{ employeeName })
  // console.log(employeeName,"htmdfdfhfghfghgghfhgrtdfgfdgdl")

  if (!employeeEmail || !employeeName || !html || !fileName) {
    return res.status(400).json({
      status: false,
      message: "Missing required fields: employeeEmail, employeeName, html, or fileName",
    });
  }

  try {
    const buffer = await createPdfBuffer(html);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });
// console.log("smtp => ", process.env.SMTP_PASSWORD)
    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: employeeEmail,
      subject: `Payslip - ${employeeName}`,
      text: "Please find your payslip attached.",
      attachments: [
        {
          filename: fileName,
          content: buffer,
          contentType: "application/pdf",
        },
      ],
    };
console.log("SMTP EMAIL:", process.env.SMTP_MAIL);
console.log("SMTP PASSWORD:", process.env.SMTP_PASSWORD);

    await transporter.sendMail(mailOptions);

    const savedSlip = await employeesSalarySlip.create(dbData);

    return res.status(200).json({
      status: true,
      message: "Payslip sent and saved successfully!",
      data: savedSlip,
    });

  } catch (error) {
    console.error("❌ Error sending payslip:", error);
    return res.status(500).json({
      status: false,
      message: "Failed to send payslip",
      error: error.message,
    });
  }
});
