import ApiError from './ApiError.js';

export const globalErrorHandler = (err, req, res, next) => {
  console.log(err);
  // console.log(err.name);

  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';
  //Mongo Id Error
  if (err.name === 'CastError') {
    const message = `Resource Not Found . Invalid:${err.path}`;
    err = new ApiError(message, 400);
  }

  //Mongo Duplicate Key Error
  if (err.message.includes('E11000 duplicate key error')) {
    const duplicateKey = extractDuplicateKeyFromErrorMessage(err.message);

    let key = duplicateKey
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());

    const message = `${key} already exists.`;
    err = new ApiError(message, 400);
  }

  //Wrong JWT Token
  if (err.name === 'JsonWebTokenError') {
    err = new ApiError('Invalid Token.', 400);
  }

  //JWT expired Error
  if (err.name === 'TokenExpiredError') {
    err = new ApiError('Token expired.', 400);
  }

  // Mongo validation Key Error
  if (
    err.statusCode === 400 &&
    (err.message.includes('validation failed') ||
      err.message.includes('Validation failed'))
  ) {
    const validationDetails = extractValidationDetails(err.message);
    return res.status(err.statusCode).json({
      status: false,
      message: 'Please enter required fields.',
      required_fields: validationDetails,
    });
  }

  return res.status(err.statusCode).json({
    statusCode: err?.statusCode,
    status: false,
    message: err.message,
  });
};

const extractDuplicateKeyFromErrorMessage = (errorMessage) => {
  const matches = errorMessage.match(/index: (\w+)_/);
  const value = errorMessage.match(/dup key: ({.*?})/);
  let dupKey = {};
  if (value) {
    try {
      // Convert the captured string to valid JSON:
      const validJsonString = value[1].replace(/(\w+):/g, '"$1":');
      dupKey = JSON.parse(validJsonString);
    } catch (e) {
      dupKey = {};
      console.error('Failed to parse duplicate key JSON:', e);
    }
  }
  let messageString = '';

  for(let i in dupKey){
    if (dupKey[i]) {
      let message =  matches ? `${i} - ${dupKey[i]}` : 'unknown key';
      messageString += message + ', ';
    } else {
      let message =  matches ? `${i}` : 'unknown key';
      messageString += message + ', ';
    }
  }
  return messageString;
};

const extractValidationDetails = (errorMessage) => {
  const indexOfSecondColon = errorMessage.indexOf(
    ':',
    errorMessage.indexOf(':')
  );
  const trimmedErrorMessage = errorMessage
    .substring(indexOfSecondColon + 1)
    .trim();

  let errorArr = trimmedErrorMessage.split(',');
  let messageObject = {};

  for (let i = 0; i < errorArr.length; i++) {
    let string = errorArr[i].trim();
    let key = string.split(':')[0].trim().replace('0.', '');
    let value = string.split(':')[1].trim();
    messageObject[key] = value;
  }

  return messageObject;
};
