"use client";

import { LoginModel } from "@/components/auth/LoginModel";

export default function Home() {
  return (
    <>
      <div className=" text-center">This is home page</div>
      <div className=" h-[50vh] bg-[#121212] flex justify-center items-center">
        <LoginModel />
      </div>
    </>
  );
}
