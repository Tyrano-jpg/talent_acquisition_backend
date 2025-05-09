import mongoose from "mongoose";
import applicationModel from "../../../database/schema/masters/CandidateApplication.schema.js";

/**
 * @desc    Bulk upload data to the database
 * @route   POST /api/bulk-upload
 * @access  Private
 */
export const srmern_bulkUpload = async (req, res) => {
  try {
    const { data } = req.body;

    if (!Array.isArray(data) || data.length === 0) {
      return res.status(400).json({ message: "No data provided or data is not in array format." });
    }

    // Validate each entry
    const requiredFields = ["email_id", "stack",];
    const missingFields = [];
    const duplicateEntries = [];
    
    // Get all existing sr_no for quick lookup
    const existingSrNos = await applicationModel.find({}, { sr_no: 1 }).lean();
    const existingSrNoSet = new Set(existingSrNos.map((app) => app.sr_no));

    // Prepare for bulk insert
    const applications = data.map((item) => {
      // Check for required fields
      const missing = requiredFields.filter((field) => !item[field]);
      if (missing.length > 0) {
        missingFields.push({ sr_no: item.sr_no, missing });
      }

      // Check for duplicate `sr_no`
      if (existingSrNoSet.has(item.sr_no)) {
        duplicateEntries.push(item.sr_no);
      }

      return {
        ...item,
        created_at: new Date(),
        updated_at: new Date(),
      };
    });

    // If there are validation errors, respond with details
    if (missingFields.length > 0 || duplicateEntries.length > 0) {
      return res.status(400).json({
        message: "Validation errors in the provided data.",
        missingFields,
        duplicateEntries,
      });
    }

    // Bulk insert to MongoDB
    await applicationModel.insertMany(applications);

    res.status(201).json({
      message: "Data uploaded successfully.",
      insertedCount: applications.length,
    });

  } catch (error) {
    console.error("Bulk upload error:", error.message);
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ message: "Validation Error", errors: error.errors });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
};
