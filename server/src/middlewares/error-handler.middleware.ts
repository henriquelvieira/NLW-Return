import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

function errorHandlerMiddleware(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const errorMessage: string = error.message || 'unexpected-error';
  const errorCode = StatusCodes.INTERNAL_SERVER_ERROR;


  res.status(errorCode).json({ errorMessage });
}

export default errorHandlerMiddleware;
