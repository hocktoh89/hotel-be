import { prisma } from '@/lib/prismaClient.js';
import { PrismaClient } from '@/generated/prisma/client.js';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const JWT_SECRET = process.env.JWT_SECRET || '';

export interface Context {
  prisma: PrismaClient;
  auth: {
    user: { id: string; isAdmin: boolean } | null;
    login: (args: { id: string; isAdmin: boolean }) => void;
    logout: () => void;
  };
}

const parseToken = (token: string) => {
  const parsedToken = token ? jwt.verify(token, JWT_SECRET) : null;
  if (!parsedToken) {
    return null;
  }

  const payload = z
    .object({
      id: z.string(),
      isAdmin: z.boolean(),
    })
    .safeParse(parsedToken);

  return payload.success ? payload.data : null;
};

const createContext = async ({
  req,
  res,
}: {
  req: Request;
  res: Response;
}): Promise<Context> => {
  const token = req.cookie?.token;
  const user = parseToken(token);

  return {
    prisma,
    auth: {
      user,
      login: (args: { id: string; isAdmin: boolean }) => {
        const token = jwt.sign(args, JWT_SECRET);
        res.cookie('token', token, {
          domain: 'localhost',
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        });
      },
      logout: () => {
        res.clearCookie('token');
      },
    },
  };
};

export default createContext;
