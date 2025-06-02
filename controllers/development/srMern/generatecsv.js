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
      'relevant_experience',
      'current_ctc (eg: 420000)',
      'expected_ctc (eg: 420000)',
      'joining_preference',
      'source',
      'resume_file',
      'portfolio_link',
      'stack',
    ];

    // Add header row
    worksheet.addRow(headers);

    // Stack dropdown options
    const stackOptions = [
      'sr_mern', 'jr_mern', 'sr_soft_eng', 'jr_soft_eng', 'php',
      'sr_flutter', 'jr_flutter', 'android', 'ios', 'lead_architect',
      'ai_dev', 'graphic', 'ui_ux', 'devops', 'qa',
      'digital_marketing', 'hr', 'bd', 'ba',
    ];

    // Column index for 'stack'
    const stackCol = headers.indexOf('stack') + 1;

    // Add data validation to rows 2–100 for stack column
    for (let i = 2; i <= 100; i++) {
      worksheet.getCell(i, stackCol).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [`"${stackOptions.join(',')}"`],
        showErrorMessage: true,
        errorTitle: 'Invalid Stack',
        error: 'Choose a valid stack from the dropdown.',
      };
    }

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
