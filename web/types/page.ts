import { NextPage } from "next";
import { FC, ReactNode } from "react";

export type Page<P = {}, IP = P> = NextPage<P, IP> & {
  Layout?: FC<{ children: ReactNode }>;
};

export interface NavRoute {
  href: string;
  icon: string;
}
