import mongoose from "mongoose";
import applicationModel from "../../../database/schema/masters/CandidateApplication.schema.js";

/**
 * @desc    Bulk upload data to the database
 * @route   POST /api/bulk-upload
 * @access  Private
 */
export const ios_bulkUpload = async (req, res) => {
  try {
    const { data } = req.body;

    if (!Array.isArray(data) || data.length === 0) {
      return res.status(400).json({ message: "No data provided or data is not in array format." });
    }

    // Required fields
    const requiredFields = ["email_id", "stack"];
    const missingFields = [];
    const duplicateEntries = [];

    // **Step 1:** Collect all email IDs first
    const emailList = data.map((item) => item.email_id);

    // **Step 2:** Loop through and validate
    const applications = data.map((item, index) => {
      const missing = requiredFields.filter((field) => !item[field]);

      if (missing.length > 0) {
        missingFields.push({ index, missing });
      }

      // **Step 3:** Duplicate check within the array itself
      if (item.email_id) {
        const isDuplicate = emailList.filter((email) => email === item.email_id).length > 1;
        if (isDuplicate) {
          duplicateEntries.push({ index, email_id: item.email_id });
        }
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
