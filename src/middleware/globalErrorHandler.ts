import { ErrorRequestHandler } from "express";
import { TErrorSource } from "../interface/globalInterface";
import { ZodError } from "zod";
import handleZodError from "../error/handleZodError";
import handleValidationError from "../error/handleValidationError";
import AppError from "../error/AppError";
import config from "../config";

const globalErrorHandler: ErrorRequestHandler = (errors, req, res, next) => {
  let statusCode = 500;
  let message = "something went wrong";

  let error: TErrorSource = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  if (errors instanceof ZodError) {
    const simplifiedError = handleZodError(errors);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    error = simplifiedError?.errorSource;
  }
  if (errors?.name === "ValidationError") {
    const simplifiedError = handleValidationError(errors);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    error = simplifiedError?.errorSource;
  } else if (errors instanceof AppError) {
    statusCode = errors?.statusCode;
    message = errors?.message;
    error = [
      {
        path: "",
        message: errors?.message,
      },
    ];
  } else if (errors instanceof Error) {
    message = errors?.message;
    error = [
      {
        path: "",
        message: errors?.message,
      },
    ];
  }

  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    error,
    stack: config.nodeEnv === "development" ? errors?.stack : null,
  });

  next();
};

export default globalErrorHandler;