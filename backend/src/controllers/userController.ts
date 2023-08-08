import type { Request, Response } from 'express';

import { HTTP_STATUS } from '../utils/constants';
import prisma from '../libs/prisma';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
	res.status(HTTP_STATUS.OK).json(await prisma.user.findMany());
};
