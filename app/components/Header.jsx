import { Link } from "react-router";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <header className="flex items-center justify-center self-stretch bg-(--color-element) px-4 py-8 shadow-md">
      <div className="flex w-full max-w-7xl items-center justify-between">
        <h1 className="text-lg font-extrabold">
          <Link
            to="/"
            aria-label="Go to homepage"
            className="focus-visible:ring-brand-medium focus-visible:ring-2 focus-visible:outline-none"
          >
            Where in the world?
          </Link>
        </h1>

        <ThemeToggle />
      </div>
    </header>
  );
};
export default Header;
