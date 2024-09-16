"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";

export default function SMSidebar() {
  const { data: session, status } = useSession();
  const [connectedApps, setConnectedApps] = useState(["Facebook", "Instagram"]);
  const [connectApps, setConnectApps] = useState([
    "Twitter",
    "Instagram",
    "LinkedIn",
  ]);

  if (status === "loading")
    return (
      <div>
        <SidebarSkeleton />
      </div>
    );

  if (!session)
    return <div>You need to be authenticated to view this page.</div>;

  const handleConnect = (provider: string) => {
    signIn(provider, {
      callbackUrl: `${window.location.origin}/api/auth/callback/${provider}`,
      redirect: true,
    }).then((response) => {
      if (response?.error) {
        console.error("Error connecting", response.error);
      } else {
        console.log("Token:", response?.token);
      }
    });
  };

  const handleSignout = () => {
    signOut({
      callbackUrl: "/",
    });
  };

  return (
    <>
      <div className=" bg-[#121212] h-full w-1/5 flex flex-col justify-between">
        <div>
          <span className=" px-5 py-2 text-center text-2xl font-semibold flex items-center">
            Social Media
          </span>
          <div className=" flex flex-col justify-evenly">
            <div className=" h-fit py-5">
              <span className=" px-5">Connected Apps</span>
              {connectedApps.map((app, index) => (
                <div
                  key={index}
                  className=" mx-5 mt-3 py-3 px-6 rounded-xl shadow-md bg-white text-black"
                >
                  {app}
                </div>
              ))}
            </div>
            <div className=" h-fit py-5">
              <span className=" px-5">Connect Apps</span>
              <Dialog>
                <DialogTrigger asChild>
                  <div className=" mx-5 mt-3 py-3 px-6 rounded-xl shadow-md cursor-pointer bg-white text-black hover:bg-slate-100">
                    Connect more apps
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Connect Your Accounts</DialogTitle>
                    <DialogDescription>
                      Select a social media account to connect:
                    </DialogDescription>
                  </DialogHeader>
                  {connectApps.map((app, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className=" mx-5 mt-3 py-3 px-6 rounded-xl shadow-md cursor-pointer bg-white text-black hover:bg-slate-100"
                      onClick={() => handleConnect(app.toLowerCase())}
                    >
                      Connect {app}
                    </Button>
                  ))}
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className=" mx-5 my-6 py-3 px-3 rounded-xl shadow-md bg-white text-black flex justify-between items-center">
              <div className="flex gap-2 items-center">
                {session.user?.image && (
                  <Image
                    src={session.user?.image}
                    alt={session.user?.name}
                    className=" rounded-full"
                    width={30}
                    height={30}
                  />
                )}
                <div className=" text-sm font-semibold text-gray-800">
                  {session.user?.name}
                </div>
              </div>
              <div>O</div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={handleSignout}
              className=" w-full cursor-pointer"
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}

const SidebarSkeleton = () => {
  return (
    <>
      <div className=" bg-[#121212] h-full w-1/5 flex flex-col justify-between">
        <div className=" w-full">
          <span className=" px-5 py-2 text-center text-2xl font-semibold flex items-center">
            Socail Media
          </span>
          <div className=" flex flex-col justify-evenly">
            <div className=" h-fit py-5">
              <span className=" px-5">Connected Apps</span>
              <div className=" h-14 w-[85%] mx-5 mt-3 py-3 px-6 rounded-xl shadow-md bg-[#b6b6b6] animate-pulse"></div>
              <div className=" h-14 w-[85%] mx-5 mt-3 py-3 px-6 rounded-xl shadow-md bg-[#b6b6b6] animate-pulse"></div>
            </div>
            <div className=" h-fit py-5">
              <span className=" px-5">Connect Apps</span>
              <div className=" h-14 w-[85%] mx-5 mt-3 py-3 px-6 rounded-xl shadow-md cursor-pointer bg-[#b6b6b6] animate-pulse "></div>
              <div className=" h-14 w-[85%] mx-5 mt-3 py-3 px-6 rounded-xl shadow-md cursor-pointer bg-[#b6b6b6] animate-pulse "></div>
            </div>
          </div>
        </div>
        <div className=" h-14 mx-5 my-6 py-3 px-6 rounded-xl shadow-md bg-[#b6b6b6] animate-pulse"></div>
      </div>
    </>
  );
};
