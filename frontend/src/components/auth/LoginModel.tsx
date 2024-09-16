"use client";

import { signIn } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const LoginModel = () => {
  const handleLogin = () => {
    signIn("google", {
      callbackUrl: "/post",
      redirect: true,
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Get Started</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome to this project</DialogTitle>
          <DialogDescription>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda
            dolor, quas explicabo debitis velit molestiae nihil ullam impedit
            eius odio?
          </DialogDescription>
        </DialogHeader>
        <Button variant={"outline"} onClick={handleLogin}>
          Sigin with Google
        </Button>
      </DialogContent>
    </Dialog>
  );
};
