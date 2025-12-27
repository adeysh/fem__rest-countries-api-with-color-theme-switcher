import { Outlet, useNavigation } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CountryDetailsSkeleton from "../components/CountryDetail/CountryDetailsSkeleton";
import TopBar from "../components/TopBar";

const AppLayout = () => {
  const navigation = useNavigation();

  const isNavigating = navigation.state === "loading";
  const isCountryRoute = navigation.location?.pathname.startsWith("/country/");

  const showCountrySkeleton = isNavigating && isCountryRoute;

  return (
    <>
      {/* Global loading indicator */}
      <TopBar active={isNavigating} />
      <Header />
      {/* Route-level skeleton */}
      {showCountrySkeleton ? <CountryDetailsSkeleton /> : <Outlet />}
      <Footer />
    </>
  );
};

export default AppLayout;
