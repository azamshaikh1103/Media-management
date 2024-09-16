import prisma from "../config/db.config";
import { Request, Response } from "express";

interface appInterface {
  email: string;
  provider: string;
  accessToken: string;
}

export const appController = async (req: Request, res: Response) => {
  const body: appInterface = req.body;

  if (!body) return res.status(400).json({ Warning: "Buddy, body is missing" });

  const existingUser = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (!existingUser)
    return res.status(400).json({ Warning: "User need to login first" });

  if (body.provider == "twitter") {
    const data = await prisma.user.update({
      where: { email: body.email },
      data: { twitter: body.accessToken },
    });
  }

  if (body.provider == "instagram") {
    const data = await prisma.user.update({
      where: { email: body.email },
      data: { instagram: body.accessToken },
    });
  }

  if (body.provider == "linkedIn") {
    const data = await prisma.user.update({
      where: { email: body.email },
      data: { linkedIn: body.accessToken },
    });
  }

  if (body.provider == "facebook") {
    const data = await prisma.user.update({
      where: { email: body.email },
      data: { facebook: body.accessToken },
    });
  }
};
