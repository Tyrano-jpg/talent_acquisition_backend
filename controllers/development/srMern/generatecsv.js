import ExcelJS from 'exceljs';

/**
 * @desc    Download Excel format template for uploading
 * @route   GET /api/download-excel-format
 * @access  Public/Private
 */
export const downloadCSVSrMern = async (req, res) => {
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
      'relevant_experience (eg: 3.4)',
      'current_ctc (eg: 420000)',
      'expected_ctc (eg: 420000)',
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

    worksheet.getCell(2, stackCol).note = 'Drag this cell down to apply dropdown to more rows.';

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
