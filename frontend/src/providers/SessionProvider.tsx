"use client";

import { RecoilRoot } from "recoil";
import { SessionProvider as Provider } from "next-auth/react";

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Provider>
      <RecoilRoot>{children}</RecoilRoot>
    </Provider>
  );
};
