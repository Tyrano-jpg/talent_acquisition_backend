export const DynamicSearch = (
  search = '',
  boolean = [],
  numbers = [],
  string = [],
  arrayField = []
) => {
  if (search !== '') {
    let dynamicSearchQueries = [];

    let object = [...string, ...numbers];

    // Safe string/number fields with $convert
    object?.forEach((field) => {
      dynamicSearchQueries.push({
        $expr: {
          $regexMatch: {
            input: {
              $convert: {
                input: `$${field}`,
                to: 'string',
                onError: '',
                onNull: ''
              }
            },
            regex: new RegExp(search.toString()),
            options: 'i'
          }
        }
      });
    });

    // Handle array fields using $elemMatch with regex (only for array of strings)
    arrayField?.forEach((field) => {
      dynamicSearchQueries.push({
        [field]: {
          $elemMatch: { $regex: search, $options: 'i' }
        }
      });
    });

    return dynamicSearchQueries.length > 0 ? { $or: dynamicSearchQueries } : {};
  } else {
    return {};
  }
};
