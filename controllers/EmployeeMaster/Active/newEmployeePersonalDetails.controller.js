import applicationModel from '../../../database/schema/masters/CandidateApplication.schema.js';
import { DynamicSearch } from '../../../utils/dynamicSearch/dynamic.js';
import { dynamic_filter } from '../../../utils/dymanicFilter.js';

import catchAsync from '../../../utils/errors/catchAsync.js';
import employeesPersonalDetailsModel from '../../../database/schema/masters/EmployeePersonalDetails.schema.js';

export const listing_new_employeeMaster_action = catchAsync(async (req, res, next) => {
  const {
    page = 1,
    limit = 10,
    sortBy = "updatedAt",
    sort = "desc",
    search = "",
    stage = "new",
  } = req.query;

  const {
    string,
    boolean,
    numbers,
    arrayField = [],
  } = req?.body?.searchFields || {};
  const filter = req.body?.filter;

  let search_query = {};
  if (search != "" && req?.body?.searchFields) {
    const search_data = DynamicSearch(search, boolean, numbers, string, arrayField);

    if (search_data?.length == 0) {
      return res.status(404).json({
        statusCode: 404,
        status: false,
        data: { data: [] },
        message: "Results Not Found",
      });
    }
    search_query = search_data;
  }

  const filterData = dynamic_filter(filter);

  const match_query = {
    ...filterData,
    ...search_query,
  };

  // 🔑 Map frontend column keys → DB fields
  const sortFieldMap = {
    full_name: "full_name",
    designation: "employment_details.designation",
    employee_id: "employment_details.empid",
    employee_type: "employment_details.employeetype",
    date_of_joining: "employment_details.doj",
    date_of_leaving: "employment_details.dol",
    createdAt: "createdAt", // fallback
  };

  const mappedSortBy = sortFieldMap[sortBy] || "updatedAt";
  const sortDirection = sort === "asc" ? 1 : -1;

  const aggregate_stage = [
    { $match: match_query },
    {
      $sort: {
        [mappedSortBy]: sortDirection, // ✅ dynamic sorting
        _id: -1, // secondary sort for stable ordering
      },
    },
    { $skip: (parseInt(page) - 1) * parseInt(limit) },
    { $limit: parseInt(limit) },
  ];

  const list_new_data = await employeesPersonalDetailsModel.aggregate(aggregate_stage);

  const totalCount = await employeesPersonalDetailsModel.countDocuments(match_query);
  const totalPage = Math.ceil(totalCount / limit);

  return res.status(200).json({
    statusCode: 200,
    status: "success",
    data: list_new_data,
    totalPage: totalPage,
    message: "Data fetched successfully",
  });
});



// import applicationModel from "../../../database/schema/masters/CandidateApplication.schema.js";
// import catchAsync from "../../../utils/errors/catchAsync.js";

// export const listing_new_employeeMaster_action = catchAsync(async (req, res) => {
//   let data = { ...req.body };

//   const resumeFile = req.files?.resume_file;
//   if (resumeFile?.length > 0 && resumeFile[0]) {
//     data.resume_file = resumeFile[0];
//   }

//   // Set created_by as user_name instead of _id
//   if (req.userDetails?.user_name) {
//     data.created_by = req.userDetails.user_name;
//     data.created_at = new Date();
//   }

//   const savedApplication = await applicationModel.create(data);

//   return res.status(201).json({
//     status: true,
//     data: savedApplication,
//     message: "Application submitted! Will reach out soon!",
//   });
// });
