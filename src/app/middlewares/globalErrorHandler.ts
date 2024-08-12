/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../../config';
import { IGenericErrorMessage } from '../../interfaces/error';
import handleValidationError from '../../errors/handleValidationError';
import handelZodError from '../../errors/handleZodError';
import handleCastError from '../../errors/handleCastError';
import ApiError from '../../errors/ApiError';

const globalErrorHandler: ErrorRequestHandler = (error, req, res) => {
  config.env === 'development'
    ? console.log('golobalErrorHandler~', error)
    : console.error('golobalErrorHandler~', error);

  let statusCode = 500;
  let message = 'Sumthing went wrong !';
  let errorMessages: IGenericErrorMessage[] = [];

  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ZodError) {
    const simplifiedError = handelZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error?.name === 'CastError') {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessages = error?.message
      ? [
        {
          path: '',
          message: error?.message,
        },
      ]
      : [];
  } else if (error instanceof Error) {
    message = error.message;
    errorMessages = error?.message
      ? [
        {
          path: '',
          message: error?.message,
        },
      ]
      : [];
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });
};

export default globalErrorHandler;
