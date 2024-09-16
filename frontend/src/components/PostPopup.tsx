import { postPopUpAtom } from "@/atoms/PostPopup";
import { useRecoilValue, useSetRecoilState } from "recoil";

export const PostPopup = () => {
  const setPostPopup = useSetRecoilState(postPopUpAtom);
  const postPop_Up = useRecoilValue(postPopUpAtom);

  return (
    <>
      <div
        onClick={() => {
          setPostPopup(false);
        }}
        className={` ${
          postPop_Up ? "" : "hidden"
        }  w-[82%] h-[90%] bg-black/90 z-10 absolute flex justify-center items-center`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className=" bg-white rounded-xl h-fit w-2/3"
        >
          <span className="py-1 bg-slate-200 rounded-t-xl text-xl font-semibold flex justify-center items-center">
            POST
          </span>
          <div className=" flex">
            <div>
              <div className="  mx-5 mt-3 w-[25vw] h-[25vh] py-3 px-6 rounded-xl shadow-md bg-slate-300 text-black">
                s
              </div>
              <div className="m-5 flex gap-4 w-[25vw]">
                <div className=" w-20 h-14 rounded-xl bg-red-300"></div>
                <div className=" w-20 h-14 rounded-xl bg-red-300"></div>
                <div className=" w-20 h-14 rounded-xl bg-red-300"></div>
                <div className=" w-20 h-14 rounded-xl bg-red-300"></div>
              </div>
            </div>
            <textarea className=" mr-5 my-3 p-3 overflow-y-hidden rounded-xl outline outline-none border border-slate-400 w-full resize-none"></textarea>
          </div>
          <div className=" mx-5 my-4 flex gap-5 items-center justify-end">
            <div className=" bg-black rounded-xl px-5 py-2 shadow-xl text-xl text-white font-semibold hover:bg-[#272626] cursor-pointer">
              Save as draft
            </div>
            <div className=" bg-black rounded-xl px-5 py-2 shadow-xl text-xl text-white font-semibold hover:bg-[#272626] cursor-pointer">
              Post now
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
