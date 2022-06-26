import { useRouter } from "next/router";
import { FC } from "react";
import { NavRoute } from "../../types";
import { NavLink } from "./NavLink";

export interface AppNavProps {
  routes: NavRoute[];
}

export const AppNav: FC<AppNavProps> = ({ routes }) => {
  const router = useRouter();

  return (
    <nav className="flex h-full w-12 flex-shrink-0 flex-col items-center space-y-2 border-r border-gray-200 py-4">
      {routes.map((route) => (
        <NavLink
          key={route.href}
          iconName={route.icon}
          href={route.href}
          isSelected={router.asPath.startsWith(route.href)}
        />
      ))}
    </nav>
  );
};
