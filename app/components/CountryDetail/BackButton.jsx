import { useNavigate } from "react-router";
import Button from "../Button";

const BackButton = ({ children = "Back", onClick, ...props }) => {
  const navigate = useNavigate();

  const handleClick = onClick ?? (() => navigate(-1));

  return (
    <Button
      type="button"
      onClick={handleClick}
      icon="arrow-back-outline"
      iconPosition="left"
      gap={3}
      className="px-6 py-2"
      aria-label="Go back"
      {...props}
    >
      {children}
    </Button>
  );
};

export default BackButton;
