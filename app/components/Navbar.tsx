"use client";

import { BadgeQuestionMark, Feather, List, LogOut, Sword, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import SignIn from "./SignInForm";
import Modal from "./Modal";
import { hasRole } from "@/lib/auth/authHelper";

const Navbar = () => {
  const { data: session } = useSession();
  const [signInModalOpen, setSignInModalOpen] = useState(false);

  return (
    <div>
      <nav className="bg-[var(--foreground)] text-[var(--text-color)] border-b border-gray-300 h-16">
        <div className="flex justify-between h-full text-lg font-semibold">
          {/* LEFT SIDE */}
          <div className="flex h-full items-stretch">
            <Link href="/" className="flex items-center px-4 h-full">
              <div className="relative h-8 w-8 md:h-10 md:w-10">
                <Image
                  src="/genshin-site-logo.svg"
                  alt="GIL"
                  fill
                  className="object-contain invert"
                  priority
                />
              </div>
            </Link>

            <Link
              href="/characters"
              className="flex items-center px-4 h-full hover:bg-[var(--hover-color)] transition-colors"
            >
              <User />
              <span className="ml-2">Figuren</span>
            </Link>

            <Link
              href="/weapons"
              className="flex items-center px-4 h-full hover:bg-[var(--hover-color)] transition-colors"
            >
              <Sword />
              <span className="ml-2">Waffen</span>
            </Link>

            <Link
              href="/artifacts"
              className="flex items-center px-4 h-full hover:bg-[var(--hover-color)] transition-colors"
            >
              <Feather />
              <span className="ml-2">Artefakte</span>
            </Link>

            <Link
              href="/genshindle"
              className="flex items-center px-4 h-full hover:bg-[var(--hover-color)] transition-colors"
            >
              <BadgeQuestionMark />
              <span className="ml-2">Genshindle</span>
            </Link>
            <Link
              href="/tier-lists"
              className="flex items-center px-4 h-full hover:bg-[var(--hover-color)] transition-colors"
            >
              <List />
              <span className="ml-2">Tier Lists</span>
            </Link>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex h-full items-stretch">
            {hasRole(session, "admin") && (
              <Link
                href="/admin"
                className="flex items-center px-4 h-full text-[#D91B24] hover:text-[#761F21] hover:bg-[var(--hover-color)] transition-colors"
              >
                <User />
                <span className="ml-2">Admin</span>
              </Link>
            )}

            {/* USER AREA */}
            <div className="relative flex items-center px-4 h-full hover:bg-[var(--hover-color)] group cursor-pointer">
              {session ? (
                <>
                  <div className="flex items-center gap-2">
                    <img
                      src={session.user?.image || "/default-avatar.png"}
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{session.user?.name || "User"}</span>
                  </div>

                  {/* Dropdown */}
                  <div className="absolute right-0 top-full hidden group-hover:block bg-[var(--hover-color)] shadow-lg min-w-full z-50">
                    <button
                      onClick={() => signOut()}
                      className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-500"
                    >
                      <LogOut />
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition-colors"
                  onClick={() => setSignInModalOpen(true)}
                >
                  Sign in
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* MODAL */}
      <Modal
        open={signInModalOpen}
        onClose={() => setSignInModalOpen(false)}
        title="Sign In"
      >
        <SignIn />
      </Modal>
    </div>
  );
};

export default Navbar;
