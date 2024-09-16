import MainTab from "@/components/MainTab";
import SMSidebar from "@/components/SM-Sidebar";

export default function Home() {
  return (
    <>
      <div className=" h-screen w-screen flex">
        <SMSidebar />
        <MainTab />
      </div>
    </>
  );
}
