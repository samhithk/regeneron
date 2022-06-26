import { FC } from "react";
import Link from "next/link";

export interface NavLinkProps {
  iconName: string;
  href: string;
  isSelected?: boolean;
}

export const NavLink: FC<NavLinkProps> = ({
  iconName,
  href,
  isSelected = false,
}) => {
  return (
    <Link href={href}>
      <a href={href} className="flex h-8 w-8 items-center justify-center">
        <i
          className={`${iconName} ${
            isSelected ? "text-gray-900" : "text-gray-400 hover:text-gray-900"
          }  text-xl transition`}
        ></i>
      </a>
    </Link>
  );
};
