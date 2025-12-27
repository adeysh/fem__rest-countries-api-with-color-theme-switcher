import clsx from "clsx";

const TopBar = ({ active = false }) => {
  if (!active) return null;

  return (
    <div
      role="progressbar"
      aria-label="Loading"
      className="fixed inset-x-0 top-0 z-50 h-1 animate-pulse bg-(--color-top-bar) motion-reduce:animate-none"
    />
  );
};
export default TopBar;
