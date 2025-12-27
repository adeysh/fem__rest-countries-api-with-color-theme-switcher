import clsx from "clsx";

const Icon = ({
  name,
  size = 20,
  color = "",
  className = "",
  label,
  ...props
}) => {
  const isDecorative = !label;

  return (
    <ion-icon
      suppressHydrationWarning
      name={name}
      role={isDecorative ? undefined : "img"}
      aria-hidden={isDecorative}
      aria-label={label}
      style={{ fontSize: size, color: color }}
      className={clsx("inline-block", className)}
      {...props}
    ></ion-icon>
  );
};
export default Icon;
