import { FC, ReactNode } from "react";
import Image from "next/image";
import { AppNav } from "../navigation";
import { appRoutes } from "./routes";

export interface AppLayoutProps {
  children?: ReactNode;
}

export const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  return (
    <main className="h-screen w-screen overflow-hidden">
      <header className="flex flex-shrink-0 items-center justify-between border-b border-gray-200 p-2">
        <Image
          height={32}
          width={32}
          className="rounded"
          src="/regeneron_logo.png"
          alt="something"
        />
        <Image
          height={32}
          width={32}
          className="rounded"
          src="https://avatars.dicebear.com/api/initials/samhith%20kotagiri.svg"
          alt="something"
        />
      </header>
      <div className="flex h-full w-full">
        <AppNav routes={appRoutes} />
        <div className="h-full w-full">{children}</div>
      </div>
    </main>
  );
};
