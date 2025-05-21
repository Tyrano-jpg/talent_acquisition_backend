import { format } from 'fast-csv';
import { Readable } from 'stream';
import applicationModel from '../../../database/schema/masters/CandidateApplication.schema.js';

const getSchemaFields = (schema) => {
  const paths = schema.paths;
  const fieldNames = [];

  for (const path in paths) {
    if (
      !path.includes('.') &&
      !['_id', '__v'].includes(path)
    ) {
      fieldNames.push(path);
    }
  }

  return fieldNames;
};

export const downloadCSVFormat = (req, res) => {
  try {
    const schema = applicationModel.schema; // ✅ FIXED HERE
    const fieldNames = getSchemaFields(schema);

    const csvStream = format({ headers: fieldNames });
    const readable = new Readable();
    readable._read = () => {};
    readable.push(null); // No row data

    res.setHeader('Content-Disposition', 'attachment; filename=application_upload_template.csv');
    res.setHeader('Content-Type', 'text/csv');

    csvStream.pipe(res);
    csvStream.write({}); // Just writes headers
    csvStream.end();

  } catch (error) {
    console.error('Error generating CSV file:', error);
    res.status(500).json({ message: 'Failed to generate CSV format' });
  }
};
