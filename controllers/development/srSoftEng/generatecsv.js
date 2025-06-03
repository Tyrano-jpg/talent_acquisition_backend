import ExcelJS from 'exceljs';

/**
 * @desc    Download CSV format template for uploading
 * @route   GET /api/download-csv-format
 * @access  Public/Private
 */
export const downloadCSVSrSoftEng = async (req, res) => {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Application Template');

    // Define headers
    const headers = [
      'full_name',
      'email_id',
      'contact_no',
      'current_org',
      'key_skill',
      'notice_period',
      'relevant_experience',
      'current_ctc',
      'expected_ctc',
      'joining_preference',
      'source',
      'resume_file',
      'portfolio_link',
      'stack',
    ];

    // Set up columns with width and no-wrap alignment
    worksheet.columns = headers.map(header => ({
      header,
      width: 25,
      style: { alignment: { wrapText: false } },
    }));

    // Bold and wrap off for header
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true };
    headerRow.alignment = { wrapText: false };

    // Stack dropdown options
    const stackOptions = [
      'sr_mern', 'jr_mern', 'sr_soft_eng', 'jr_soft_eng', 'php',
      'sr_flutter', 'jr_flutter', 'android', 'ios', 'lead_architect',
      'ai_dev', 'graphic', 'ui_ux', 'devops', 'qa',
      'digital_marketing', 'hr', 'bd', 'ba',
    ];

    const fullNameCol = headers.indexOf('full_name') + 1;
    worksheet.getCell(1, fullNameCol).note = 'Required';

    const emailCol = headers.indexOf('email_id') + 1;
    worksheet.getCell(1, emailCol).note = 'Required';

    const contactNoCol = headers.indexOf('contact_no') + 1;
    worksheet.getCell(1, contactNoCol).note = 'Mobile number should be between 10 and 12 digits';

    const relevantExpCol = headers.indexOf('relevant_experience') + 1;
    worksheet.getCell(1, relevantExpCol).note = 'Experience in years, e.g., 3.4';

    const currentCTCCol = headers.indexOf('current_ctc') + 1;
    worksheet.getCell(1, currentCTCCol).note = 'Current CTC expects a number, e.g., 420000';

    const expectedCTCCol = headers.indexOf('expected_ctc') + 1;
    worksheet.getCell(1, expectedCTCCol).note = 'Expected CTC expects a number, e.g., 420000';

    const keySkillCol = headers.indexOf('key_skill') + 1;
    worksheet.getCell(1, keySkillCol).note = 'Key skills must be comma seperated'

    const stackCol = headers.indexOf('stack') + 1;
    worksheet.getCell(1, stackCol).note =
      'Select a value from the dropdown in row 2 and drag down to apply it to more rows.';

    // Apply dropdown validation for future rows (rows 2 to 100 for example)
    worksheet.getCell(2, stackCol).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`"${stackOptions.join(',')}"`],
      showErrorMessage: true,
      errorTitle: 'Invalid Stack',
      error: 'Choose a valid stack from the dropdown.',
    };

    worksheet.getCell(2, stackCol).note = 'Drag this cell down to apply dropdown to more rows. Delete unused cells.';

    // Set response headers
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=application_upload_template.xlsx');

    // Write the file to the response
    await workbook.xlsx.write(res);
    res.end();

  } catch (error) {
    console.error('Error generating Excel file:', error);
    res.status(500).json({ message: 'Failed to generate Excel file' });
  }
};
