"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Home() {
  return (
    <>
      <div className=" text-center">This is home page</div>
      <div className=" h-[50vh] bg-[#121212] flex justify-center items-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Get Started</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Welcome to this project</DialogTitle>
              <DialogDescription>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Assumenda dolor, quas explicabo debitis velit molestiae nihil
                ullam impedit eius odio?
              </DialogDescription>
            </DialogHeader>
            <Button variant={"outline"} onClick={() => signIn()}>
              Sigin with Google
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
