import applicationModel from '../../../database/schema/masters/CandidateApplication.schema.js';
import { DynamicSearch } from '../../../utils/dynamicSearch/dynamic.js';
import { dynamic_filter } from '../../../utils/dymanicFilter.js';

import catchAsync from '../../../utils/errors/catchAsync.js';

export const listing_new_jrmern = catchAsync(async (req, res, next) => {
  const {
    page = 1,
    limit = 10,
    sortBy = 'updatedAt',
    sort = 'desc',
    search = '',
    stage = 'new',
  } = req.query;

  console.log("stage =>",stage)
  const {
    string,
    boolean,
    numbers,
    arrayField = [],
  } = req?.body?.searchFields || {};
  const filter = req.body?.filter;

  let search_query = {};
  if (search != '' && req?.body?.searchFields) {
    const search_data = DynamicSearch(
      search,
      boolean,
      numbers,
      string,
      arrayField
    );

    if (search_data?.length == 0) {
      return res.status(404).json({
        statusCode: 404,
        status: false,
        data: {
          data: [],
        },
        message: 'Results Not Found',
      });
    }
    search_query = search_data;
  }

  const filterData = dynamic_filter(filter);

  const match_query = {
    ...filterData,
    ...search_query,
    stage:stage,
    stack: "sr_mern"
  };

  const aggregate_stage = [
    {
      $match: match_query,
    },
    {
      $sort: {
        [sortBy]: sort === 'desc' ? -1 : 1,
        _id: sort === 'desc' ? -1 : 1,
      },
    },
    {
      $skip: (parseInt(page) - 1) * parseInt(limit),
    },
    {
      $limit: parseInt(limit),
    },
  ];

  const list_new_data = await applicationModel.aggregate(aggregate_stage);

  const totalCount = await applicationModel.countDocuments({
    ...match_query,
  });

  const totalPage = Math.ceil(totalCount / limit);

  return res.status(200).json({
    statusCode: 200,
    status: 'success',
    data: list_new_data,
    totalPage: totalPage,
    message: 'Data fetched successfully',
  });
});
