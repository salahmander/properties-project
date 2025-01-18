import Link from "next/link";

import { signIn } from "next-auth/react";

import type { Session } from "next-auth";

import { FaGoogle } from "react-icons/fa";
import { ProvidersType } from "@/types/index.types";

type MobileMenuProps = {
  pathName: string;
  session: Session | null;
  providers: ProvidersType | null;
};

const MobileMenu = ({ pathName, session, providers }: MobileMenuProps) => {
  return (
    <div className="md:hidden" id="mobile-menu">
      <div className="space-y-1 px-2 pb-3 pt-2">
        <Link
          href="/"
          className={`${
            pathName === "/" ? "bg-black" : ""
          } text-white block rounded-md px-3 py-2 text-base font-medium`}
        >
          Home
        </Link>
        <Link
          href="/properties"
          className={`${
            pathName === "/properties" ? "bg-black" : ""
          } text-white block rounded-md px-3 py-2 text-base font-medium`}
        >
          Properties
        </Link>
        {session && (
          <Link
            href="/properties/add"
            className={`${
              pathName === "/properties/add" ? "bg-black" : ""
            } text-white block rounded-md px-3 py-2 text-base font-medium`}
          >
            Add Property
          </Link>
        )}
        {providers &&
          Object.values(providers).map((provider, index) => (
            <button
              key={index}
              onClick={() => signIn(provider.id)}
              className="flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 my-5"
            >
              <FaGoogle className="text-white mr-2" />
              <span>Login or Register</span>
            </button>
          ))}
      </div>
    </div>
  );
};

export default MobileMenu;
