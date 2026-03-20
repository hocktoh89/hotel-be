import { prisma } from '@/lib/prismaClient.js';
import { PrismaClient } from '@/generated/prisma/client.js';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const JWT_SECRET = process.env.JWT_SECRET || '';

export interface Context {
  prisma: PrismaClient;
  auth: {
    me: { id: string; email: string; isAdmin: boolean } | null;
    // user: { userId: string; isAdmin: boolean } | null;
    login: (args: { id: string; email: string; isAdmin: boolean }) => void;
    // logout: () => void;
  };
}

const parseToken = (rawToken: string | undefined) => {
  const [scheme, token] = rawToken?.trim().split(' ') || [];
  const parsedToken = token ? jwt.verify(token, JWT_SECRET) : null;
  if (!parsedToken) {
    return null;
  }
  // console.log('. parsedToken ', parsedToken);
  const payload = z
    .object({
      id: z.string(),
      email: z.string(),
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
  // const token = req.cookies?.token;
  const token = req.headers.authorization;
  const user = parseToken(token);

  // console.log('. user ', user);

  return {
    prisma,
    auth: {
      me: user,
      login: (args: { id: string; email: string; isAdmin: boolean }) => {
        // console.log('.  args.  ', args);
        const token = jwt.sign(args, JWT_SECRET);
        console.log('.  toke n', token);
        res.cookie('token', token, {
          // domain: 'localhost',
          expires: new Date(Date.now() + 30 * 60 * 1000),
          httpOnly: true,
          sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'none',
          secure: true,
          // secure: process.env.NODE_ENV === 'production',
        });
      },
      // logout: () => {
      //   res.clearCookie('token');
      // },
    },
  };
};

export default createContext;
