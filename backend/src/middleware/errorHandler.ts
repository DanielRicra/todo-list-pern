import type { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS } from '../utils/constants';

export const errorHandler = (
	err: Error | unknown,
	_req: Request,
	res: Response,
	_next: NextFunction
): void => {
	if (err instanceof Error) {
		res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
			error: err.message,
		});
	} else {
		res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
			error: 'Something went wrong',
		});
	}
};
