import path from 'path';
import fs from 'fs';
import hbs from 'handlebars';
import puppeteer from 'puppeteer';
import nodemailer from 'nodemailer';
import moment from 'moment';
import applicationModel from '../../../database/schema/masters/CandidateApplication.schema.js';

export const generateAndSendPDF = async (req, res) => {
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

    // Load the HBS template
    const templatePath = path.join(process.cwd(), 'views', templateFileName);
    if (!fs.existsSync(templatePath)) {
      return res.status(500).json({
        status: 'error',
        message: `Template file ${templateFileName} not found!`,
      });
    }

    const templateHtml = fs.readFileSync(templatePath, 'utf-8');

    // Convert Logo to base64
    const logoPath = path.join(process.cwd(), 'public', 'upload', 'images', 'Logo.png');
    let logoBase64 = '';
    if (fs.existsSync(logoPath)) {
      const logoBuffer = fs.readFileSync(logoPath);
      const logoMime = 'image/png';
      logoBase64 = `data:${logoMime};base64,${logoBuffer.toString('base64')}`;
    }

    // Convert Watermark to base64
    const watermarkPath = path.join(process.cwd(), 'public', 'upload', 'images', 'phi-logo.png');
    let watermarkBase64 = '';
    if (fs.existsSync(watermarkPath)) {
      const watermarkBuffer = fs.readFileSync(watermarkPath);
      const watermarkMime = 'image/png';
      watermarkBase64 = `data:${watermarkMime};base64,${watermarkBuffer.toString('base64')}`;
    }

    // Fetch application data
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
    const calculatedValue = ((expected_ctc / 100) * 2) - current_ctc;

    const stackMap = {
      sr_mern: "Sr MERN Developer",
      jr_mern: "Jr MERN Developer",
    };

    const displayStack = stackMap[stack] || stack;
    const formattedDateOfJoining = date_of_joining
      ? moment(date_of_joining).format('DD/MM/YYYY')
      : 'N/A';

    // Compile Handlebars template
    const template = hbs.compile(templateHtml);
    const finalHtml = template({
      full_name,
      stack: displayStack,
      date_of_joining: formattedDateOfJoining,
      expected_ctc,
      current_ctc,
      calculated_value: calculatedValue,
      logo: logoBase64,
      watermark: watermarkBase64,
      location: application.location || 'N/A', // Ensure location if needed
    });

    // Generate PDF with margins to avoid cut-off
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
        top: '100px', // leave room for header
        bottom: '50px', // leave room for footer/bottom strip
        left: '20px',
        right: '20px',
      },
    });
    await browser.close();

    // Send email with PDF
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

    // Update DB
    await applicationModel.findByIdAndUpdate(_id, {
      [statusFieldToUpdate]: true,
    });

    res.status(200).json({
      status: 'success',
      message: `${emailSubject} PDF generated, emailed, and status updated successfully.`,
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
