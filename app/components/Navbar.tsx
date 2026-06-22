"use client";

import {
  BadgeQuestionMark,
  Feather,
  Home,
  LogOut,
  Sword,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import SignIn from "./SignInForm";
import Modal from "./Modal";

const Navbar = () => {
  const { data: session } = useSession();
	const [signInModalOpen, setSignInModalOpen] = useState(false);

  return (
    <div className="">
      <nav className="bg-[var(--foreground)] text-[var(--text-color)] border-b border-gray-300">
        <ul className="flex text-lg font-semibold">
          <li className="transition-colors p-2">
            <Link href="/" className="flex items-center gap-1">
              <div className="relative h-[1.5em] w-[1.5em] md:h-[2.5em] md:w-[2.5em]">
                <Image
                  src="/genshin-site-logo.svg"
                  alt="GIL"
                  fill
                  className="object-contain invert"
                  priority
                />
              </div>
            </Link>
          </li>
          {/* <Link
            href="/"
            className="hover:bg-[var(--hover-color)] transition-colors flex gap-1 items-center"
          >
            <li className="flex items-center p-3">
              <Home />
              Home
            </li>
          </Link> */}
          <Link
            href="/characters"
            className="hover:bg-[var(--hover-color)] transition-colors flex items-center"
          >
            <li className="flex items-center p-3 gap-1">
              <User />
              Figuren
            </li>
          </Link>
          <Link
            href="/weapons"
            className="hover:bg-[var(--hover-color)] transition-colors flex items-center"
          >
            <li className="flex items-center p-3 gap-1">
              <Sword />
              Waffen
            </li>
          </Link>
          <Link
            href="/artifacts"
            className="hover:bg-[var(--hover-color)] transition-colors flex items-center"
          >
            <li className="flex items-center p-3 gap-1">
              <Feather />
              Artefakte
            </li>
          </Link>
          <Link
            href="/genshindle"
            className="hover:bg-[var(--hover-color)] transition-colors flex items-center"
          >
            <li className="flex items-center p-3 gap-1">
              <BadgeQuestionMark />
              Genshindle
            </li>
          </Link>
          <Link
            href="/admin"
            className="hover:bg-[var(--hover-color)] text-[#D91B24] hover:text-[#761F21] transition-colors flex items-center ml-auto"
          >
            <li className="flex items-center p-3 gap-1">
              <User />
              Admin
            </li>
          </Link>
          <li className="relative flex items-center p-3 gap-1 hover:bg-[var(--hover-color)] transition-colors group cursor-pointer">
            {session ? (
              <>
                <div className="flex items-center gap-2 w-[10rem]">
                  <img
                    src={session.user?.image || "/default-avatar.png"}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <p>{session.user?.name || "User"}</p>
                </div>

                {/* Dropdown */}
                <div className="absolute top-full right-0 hidden group-hover:block bg-[var(--hover-color)] shadow-lg w-full z-50 cursor-pointer">
                  <button
                    onClick={() => signOut()}
                    className="w-full text-left px-3 py-2 hover:bg-gray-500 rounded cursor-pointer flex items-center gap-1"
                  >
                    <LogOut />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  className="bg-blue-500 hover:bg-blue-600 rounded text-white hover:text-blue-100 transition-colors p-2 cursor-pointer"
                  onClick={() => setSignInModalOpen(true)}
                >
                  Sign in
                </button>
              </div>
            )}
          </li>
        </ul>
      </nav>
			<Modal open={signInModalOpen} onClose={() => setSignInModalOpen(false)} title="Sign In">
				<SignIn />
			</Modal>
    </div>
  );
};

export default Navbar;
