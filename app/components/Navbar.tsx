import { BadgeQuestionMark, Feather, Home, Sword, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
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
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
