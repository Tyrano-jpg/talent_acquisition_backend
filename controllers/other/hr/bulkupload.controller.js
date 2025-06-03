import mongoose from "mongoose";
import applicationModel from "../../../database/schema/masters/CandidateApplication.schema.js";

/**
 * @desc    Bulk upload data to the database
 * @route   POST /api/bulk-upload
 * @access  Private
 */
export const hr_bulkUpload = async (req, res) => {
  try {
    let { data } = req.body;

    if (!Array.isArray(data) || data.length === 0) {
      return res.status(400).json({ message: "No data provided or data is not in array format." });
    }

    // ✅ Step 1: Clean field keys and values, and filter out blank rows
    data = data
      .map((row, index) => {
        const cleaned = {};
        for (const key in row) {
          const cleanKey = key.trim().replace(/\uFEFF/g, "");
          let value = row[key];

          if (cleanKey === 'key_skill' && typeof value === "string") {
            cleaned[cleanKey] = value
              .split(",")
              .map(skill => skill.trim())
              .filter(Boolean); // Remove empty strings
          } else {
            cleaned[cleanKey] = typeof value === "string" ? value.trim() : value;
          }
        }
        return cleaned;
      })
      .filter((row, index) => {
        const isEmpty = Object.values(row).every(val => !val || val === "");
        if (isEmpty) {
          console.warn(`Row ${index} is empty or invalid and will be skipped.`);
        }
        return !isEmpty;
      });

    // ✅ Required fields
    const requiredFields = ["email_id", "stack", 'full_name'];
    const missingFields = [];
    const duplicateEntries = [];

    // ✅ Email list for detecting duplicates
    const emailList = data.map(item => item.email_id);

    const applications = data.map((item, index) => {
      // ✅ Missing required field check
      const missing = requiredFields.filter(field => !item[field] || item[field].trim() === "");
      if (missing.length > 0) {
        missingFields.push({ index, missing });
      }

      // ✅ Duplicate email check
      const isDuplicate =
        item.email_id &&
        emailList.filter(email => email === item.email_id).length > 1;
      if (isDuplicate) {
        duplicateEntries.push({ index, email_id: item.email_id });
      }

      return {
        ...item,
        created_at: new Date(),
        updated_at: new Date(),
        created_by: req.userDetails?.user_name || "system", // <-- Add username here
      };
    });

    if (missingFields.length > 0 || duplicateEntries.length > 0) {
      return res.status(400).json({
        message: "Validation errors in the provided data.",
        missingFields,
        duplicateEntries,
      });
    }

    // ✅ Insert into MongoDB
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
