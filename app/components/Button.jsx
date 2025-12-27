import Icon from "./Icon";
import clsx from "clsx";

const Button = ({
  children,
  onClick,
  icon = "",
  iconPosition = "right",
  iconSize = 16,
  gap = 2,
  iconClassName = "",
  className = "",
  disabled = false,
  ...props
}) => {
  const showLeftIcon = icon && iconPosition === "left";
  const showRightIcon = icon && iconPosition === "right";

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        "inline-flex items-center justify-center rounded-md",
        "border border-transparent bg-(--color-element)",
        "leading-5 shadow-md transition-shadow duration-300",
        "hover:shadow-lg",
        "focus-visible:ring-2 focus-visible:outline-none",
        "cursor-pointer disabled:cursor-not-allowed disabled:opacity-60",
        gap && `gap-${gap}`,
        className,
      )}
      {...props}
    >
      {showLeftIcon && (
        <span className={`${iconClassName} flex items-center justify-center`}>
          <Icon name={icon} size={iconSize} />
        </span>
      )}

      <span>{children}</span>

      {showRightIcon && (
        <span className={`${iconClassName} flex items-center justify-center`}>
          <Icon name={icon} size={iconSize} />
        </span>
      )}
    </button>
  );
};

export default Button;
