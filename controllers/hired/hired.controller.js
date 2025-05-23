import applicationModel from "../../database/schema/masters/CandidateApplication.schema.js";
import { DynamicSearch } from "../../utils/dynamicSearch/dynamic.js";
import { dynamic_filter } from "../../utils/dymanicFilter.js";
import catchAsync from "../../utils/errors/catchAsync.js";

export const getHiredApplications = catchAsync(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    sortBy = "updatedAt",
    sort = "desc",
    search = "",
  } = req.query;

  const {
    string,
    boolean,
    numbers,
    arrayField = [],
  } = req?.body?.searchFields || {};
  const filter = req.body?.filter;

  let search_query = {};
  if (search !== "" && req?.body?.searchFields) {
    const search_data = DynamicSearch(
      search,
      boolean,
      numbers,
      string,
      arrayField
    );

    if (!search_data?.length) {
      return res.status(404).json({
        success: false,
        data: [],
        message: "No results found.",
      });
    }
    search_query = search_data;
  }

  const filterData = dynamic_filter(filter);

  const match_query = {
    ...filterData,
    ...search_query,
    stage: "hired",
  };

  const aggregate_pipeline = [
    { $match: match_query },
    {
      $sort: {
        [sortBy]: sort === "desc" ? -1 : 1,
        _id: sort === "desc" ? -1 : 1,
      },
    },
    { $skip: (parseInt(page) - 1) * parseInt(limit) },
    { $limit: parseInt(limit) },
  ];

  const hiredApplications = await applicationModel.aggregate(aggregate_pipeline);

  const totalCount = await applicationModel.countDocuments(match_query);
  const totalPage = Math.ceil(totalCount / limit);

  return res.status(200).json({
    success: true,
    count: hiredApplications.length,
    totalPage,
    data: hiredApplications,
  });
});
