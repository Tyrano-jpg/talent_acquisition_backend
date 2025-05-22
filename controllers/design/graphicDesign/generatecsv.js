import { format } from 'fast-csv';
import { Readable } from 'stream';
import applicationModel from '../../../database/schema/masters/CandidateApplication.schema.js';

/**
 * @desc    Download CSV format template for uploading
 * @route   GET /api/download-csv-format
 * @access  Public/Private
 */
export const downloadCSVGraphics = (req, res) => {
  try {
    // ✅ Static template field names
    const fieldNames = [
      'full_name',
      'email_id',
      'contact_no',
      'current_location',
      'current_org',
      'role',
      'industry',
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

    const csvStream = format({ headers: fieldNames });
    const readable = new Readable();
    readable._read = () => {};
    readable.push(null); // No row data; just headers

    res.setHeader('Content-Disposition', 'attachment; filename=application_upload_template.csv');
    res.setHeader('Content-Type', 'text/csv');

    csvStream.pipe(res);
    csvStream.write({}); // Writes only headers
    csvStream.end();
  } catch (error) {
    console.error('Error generating CSV file:', error);
    res.status(500).json({ message: 'Failed to generate CSV format' });
  }
};
