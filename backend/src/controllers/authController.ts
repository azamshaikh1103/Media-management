import { Request, Response } from "express";
import prisma from "../config/db.config.js";
import jwt from "jsonwebtoken";

interface LoginPayloadType {
  name: string;
  email: string;
  image?: string;
  twitter?: string;
  instagram?: string;
  facebook?: string;
  linkedIn?: string;
  oauth: string;
}

export const authController = async (req: Request, res: Response) => {
  const body: LoginPayloadType = req.body;

  if (!body) return res.status(400).json({ Warning: "Buddy, body is missing" });

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    });

    let createUser;

    if (!existingUser) {
      createUser = await prisma.user.create({ data: body });
    }

    const JWTPaayload = {
      id: existingUser?.id || createUser?.id,
      name: body.name,
      email: body.email,
    };

    const token = jwt.sign(JWTPaayload, process.env.JWT_SECRET!, {
      expiresIn: "365d",
    });

    return res.status(200).json({
      message: "Logged in successfully",
      user: { ...existingUser, token: `Bearer ${token}` },
    });
  } catch (error) {
    return res.status(400).json({ warning: "Its a catch error" });
  }
};
