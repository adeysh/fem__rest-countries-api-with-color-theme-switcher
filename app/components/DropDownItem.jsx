import clsx from "clsx";

const DropdownItem = ({
  children,
  onSelect,
  isSelected,
  disabled = false,
  className,
  ...props
}) => {
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      role="menuitem"
      aria-selected={isSelected}
      className={clsx(
        "inline-flex w-full items-center rounded px-4 py-2 text-left",
        "transition-colors",
        "focus-visible:ring-2 focus-visible:outline-none",
        "cursor-pointer",
        disabled && "cursor-not-allowed opacity-50",
        isSelected
          ? "bg-(--color-input) font-semibold"
          : "hover:bg-(--color-input)",
        className,
      )}
      aria-current={isSelected ? "true" : undefined}
      {...props}
    >
      {children}
    </button>
  );
};

export default DropdownItem;
