import { Link, useNavigate } from "react-router";
import BackButton from "../components/CountryDetail/BackButton";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main
      role="alert"
      className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center"
    >
      <h1 className="text-6xl font-extrabold">404</h1>
      <p className="text-lg text-gray-500">
        {"Sorry, the page you're looking for doesn't exist."}
      </p>

      <BackButton onClick={() => navigate("/")}>Go Back to Home</BackButton>
    </main>
  );
};

export default NotFound;
