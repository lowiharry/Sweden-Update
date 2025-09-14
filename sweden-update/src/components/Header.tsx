import Link from "next/link";
import { ThemeToggleButton } from "./ThemeToggleButton";

export function Header() {
  return (
    <header className="bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-2xl font-bold">
          Sweden Update
        </Link>
        <ThemeToggleButton />
      </div>
    </header>
  );
}
