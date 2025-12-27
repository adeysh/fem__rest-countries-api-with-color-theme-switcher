import { useLoaderData, useNavigate } from "react-router";
import BackButton from "../components/CountryDetail/BackButton";
import CountryDetails from "../components/CountryDetail/CountryDetails";
import { fetchWithTimeout } from "../utils/fetchWithTimeout";

export async function loader({ params }) {
  const { code } = params;

  if (!code) {
    throw new Response("Invalid country code", { status: 400 });
  }

  // Fetch country
  const res = await fetchWithTimeout(
    `https://restcountries.com/v3.1/alpha/${code}?fields=flags,name,population,region,subregion,capital,tld,currencies,languages,borders,cca3`,
    {},
    15000,
  );

  if (!res.ok) {
    throw new Response("Country not find country details!", { status: 404 });
  }

  const country = await res.json();

  if (!country || !country.cca3) {
    throw new Response("Invalid country data", { status: 404 });
  }

  // Fetch border countries in parallel (if any)
  let borderCountries = [];

  if (Array.isArray(country.borders) && country.borders.length) {
    const borderRes = await fetchWithTimeout(
      `https://restcountries.com/v3.1/alpha?codes=${country.borders.join(",")}&fields=name,cca3`,
      {},
      15000,
    );

    if (borderRes.ok) {
      borderCountries = await borderRes.json();
    }
  }

  return { country, borderCountries };
}

const CountryDetail = () => {
  const { country, borderCountries } = useLoaderData();
  const navigate = useNavigate();

  return (
    <main className="flex w-full max-w-7xl flex-col items-start gap-16 px-6 pt-16 pb-20 xl:px-0">
      <BackButton />
      <CountryDetails country={country} borderCountries={borderCountries} />
    </main>
  );
};

export default CountryDetail;

export function ErrorBoundary() {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col items-center gap-6 py-20 text-center">
      <h1 className="text-4xl font-bold">Country not found</h1>
      <p className="text-gray-500">
        The country you're looking for doesn't exist.
      </p>
      <BackButton onClick={() => navigate("/")}>Go Back to Home</BackButton>
    </main>
  );
}
