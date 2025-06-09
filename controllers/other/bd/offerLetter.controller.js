// ... all import statements remain unchanged
import path from 'path';
import fs from 'fs';
import hbs from 'handlebars';
import puppeteer from 'puppeteer';
import nodemailer from 'nodemailer';
import moment from 'moment';
import applicationModel from '../../../database/schema/masters/CandidateApplication.schema.js';
// Removed: import employeesModel from '../../../database/schema/masters/Employees.schema.js';

export const generateAndSendPDFBd = async (req, res) => {
  try {
    const { _id, full_name, email_id, stack, date_of_joining, action } = req.body;

    const actionMap = {
      'offer-letter': {
        templateFileName: 'offerLetter.hbs',
        emailSubject: 'Your Offer Letter',
        statusFieldToUpdate: 'offer_letter',
      },
      'confirmation-letter': {
        templateFileName: 'confirmationLetter.hbs',
        emailSubject: 'Your Confirmation Letter',
        statusFieldToUpdate: 'confirmation_letter',
      },
    };

    const actionConfig = actionMap[action];
    if (!actionConfig) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid action type provided!',
      });
    }

    const { templateFileName, emailSubject, statusFieldToUpdate } = actionConfig;

    const templatePath = path.join(process.cwd(), 'views', templateFileName);
    if (!fs.existsSync(templatePath)) {
      return res.status(500).json({
        status: 'error',
        message: `Template file ${templateFileName} not found!`,
      });
    }

    const templateHtml = fs.readFileSync(templatePath, 'utf-8');

    const logoPath = path.join(process.cwd(), 'public', 'upload', 'images', 'Logo.png');
    let logoBase64 = '';
    if (fs.existsSync(logoPath)) {
      const logoBuffer = fs.readFileSync(logoPath);
      logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`;
    }

    const watermarkPath = path.join(process.cwd(), 'public', 'upload', 'images', 'offer-letter-background.png');
    let watermarkBase64 = '';
    if (fs.existsSync(watermarkPath)) {
      const watermarkBuffer = fs.readFileSync(watermarkPath);
      watermarkBase64 = `data:image/png;base64,${watermarkBuffer.toString('base64')}`;
    }

    const signPath = path.join(process.cwd(), 'public', 'upload', 'images', 'sign.png');
    let signBase64 = '';
    if (fs.existsSync(signPath)) {
      const signBuffer = fs.readFileSync(signPath);
      signBase64 = `data:image/png;base64,${signBuffer.toString('base64')}`;
    }

    const application = await applicationModel.findById(_id);
    if (!application) {
      return res.status(404).json({
        status: 'error',
        message: 'Application not found!',
      });
    }

    if (application[statusFieldToUpdate]) {
      return res.status(400).json({
        status: 'error',
        message: `${emailSubject} already sent!`,
      });
    }

    if (action === 'confirmation-letter') {
      const joiningDate = moment(application.date_of_joining);
      const sixMonthsAfter = joiningDate.clone().add(6, 'months');
      const today = moment();
      if (today.isBefore(sixMonthsAfter)) {
        return res.status(400).json({
          status: 'error',
          message: `Confirmation letter can only be sent after ${sixMonthsAfter.format('DD/MM/YYYY')}.`,
        });
      }
    }

    const expected_ctc = application.expected_ctc || 0;
    const current_ctc = application.current_ctc || 0;
    const offered_ctc = application.offered_ctc || 0;

    // CTC Calculations
    const basic_salary = +(offered_ctc * 0.4).toFixed(2);
    const hra = +(offered_ctc * 0.2).toFixed(2);
    const education_allowance = +(offered_ctc * 0.03).toFixed(2);
    const medical_allowance = +(offered_ctc * 0.03).toFixed(2);
    const travelling_allowance = +(offered_ctc * 0.04).toFixed(2);
    const other_allowance = +(offered_ctc * 0.3).toFixed(2);

    const basic_salary_month = +(basic_salary / 12).toFixed(2);
    const hra_month = +(hra / 12).toFixed(2);
    const education_allowance_month = +(education_allowance / 12).toFixed(2);
    const medical_allowance_month = +(medical_allowance / 12).toFixed(2);
    const travelling_allowance_month = +(travelling_allowance / 12).toFixed(2);
    const other_allowance_month = +(other_allowance / 12).toFixed(2);

    const gross_salary_month = +(
      basic_salary_month +
      hra_month +
      education_allowance_month +
      medical_allowance_month +
      travelling_allowance_month +
      other_allowance_month
    ).toFixed(2);

    let professional_tax = 0;
    const gender = application.gender?.toLowerCase();
    if (gender == 'male') {
      if (gross_salary_month < 7500) {
        professional_tax = 0;
      } else if (gross_salary_month >= 7501 && gross_salary_month < 10000) {
        professional_tax = 175;
      } else if (gross_salary_month >= 10000) {
        professional_tax = 200;
      }
    } else if (gender == 'female') {
      if (gross_salary_month > 25000) {
        professional_tax = 200;
      }
    }

    const net_ctc_month = gross_salary_month - professional_tax;
    const calculatedValue = +(net_ctc_month * 12).toFixed(2);

    const stackMap = {
      sr_mern: 'Sr MERN Developer',
      jr_mern: 'Jr MERN Developer',
    };

    const displayStack = stackMap[stack] || stack;
    const formattedDateOfJoining = date_of_joining
      ? moment(date_of_joining).format('DD/MM/YYYY')
      : 'N/A';

    const title = gender === 'male' ? 'Mister' : gender === 'female' ? 'Miss' : '';

    const template = hbs.compile(templateHtml);
    const finalHtml = template({
      full_name,
      title,
      stack: displayStack,
      date_of_joining: formattedDateOfJoining,
      expected_ctc,
      current_ctc,
      calculated_value: calculatedValue,
      logo: logoBase64,
      watermark: watermarkBase64,
      sign: signBase64,
      location: application.location || 'N/A',

      basic_salary,
      education_allowance,
      hra,
      medical_allowance,
      travelling_allowance,
      other_allowance,
      offered_ctc,

      basic_salary_month,
      education_allowance_month,
      hra_month,
      medical_allowance_month,
      travelling_allowance_month,
      other_allowance_month,
      gross_salary_month,
      professional_tax,
      net_ctc_month,
    });

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.setContent(finalHtml, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '100px',
        bottom: '50px',
        left: '20px',
        right: '20px',
      },
    });
    await browser.close();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: '"HR Department" <your@email.com>',
      to: email_id,
      subject: emailSubject,
      text: `Please find attached your ${emailSubject.toLowerCase()}.`,
      attachments: [
        {
          filename: `${emailSubject.replace(/ /g, '')}.pdf`,
          content: pdfBuffer,
          contentType: 'application/pdf',
        },
      ],
    });

    // Removed: Employee creation logic

    await applicationModel.findByIdAndUpdate(_id, {
      [statusFieldToUpdate]: true,
    });

    res.status(200).json({
      status: 'success',
      message: `${emailSubject} PDF generated, emailed, and status updated.`,
    });
  } catch (error) {
    console.error('ERROR stack:', error.stack);
    console.error('ERROR message:', error.message);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong while generating and sending the PDF.',
      error: error.message,
    });
  }
};
