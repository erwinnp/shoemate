import Link from "next/link";
import DropdownUser from "./dropdown-user";

export default async function Navbar() {
  return (
    <header className="container max-w-screen-lg mx-auto max-md:px-4 px-6 py-4">
      <nav className="flex justify-between items-center">
        <Link href={"/"} className="text-2xl font-semibold">
          ShoeMate
        </Link>
        <DropdownUser />
      </nav>
    </header>
  );
}
