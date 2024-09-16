"use client";

import { PostPopup } from "./PostPopup";
import { useSetRecoilState } from "recoil";
import { postPopUpAtom } from "@/atoms/PostPopup";

export default function MainTab() {
  const setPostPopup = useSetRecoilState(postPopUpAtom);

  return (
    <div className="w-full h-full">
      <div className=" px-5 py-2 text-center text-2xl font-semibold flex items-center">
        Posts
      </div>
      <div className=" bg-white mx-5 h-[90%] rounded-xl shadow-xl text-black">
        <PostPopup />
        <div className=" w-full h-full flex flex-col justify-center items-center">
          <span className=" text-2xl font-semibold py-2">
            You have no post in draft
          </span>
          <div
            onClick={() => setPostPopup(true)}
            className=" bg-black rounded-xl px-5 py-2 shadow-xl text-2xl text-white font-semibold hover:bg-[#272626] cursor-pointer"
          >
            Post
          </div>
        </div>
      </div>
    </div>
  );
}
