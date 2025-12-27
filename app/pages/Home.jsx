import { useLoaderData, useSearchParams, useNavigation } from "react-router";
import { fetchWithTimeout } from "../utils/fetchWithTimeout";
import CountryList from "../components/Home/CountryList";
import RegionFilter from "../components/Home/RegionFilter";
import SearchBar from "../components/Home/SearchBar";

let cachedCountries;
let cacheTimestamp;

const CACHE_TTL = 1000 * 60 * 60; // 1 hour

export async function loader() {
  const now = Date.now();

  // Serve from cache if valid
  if (cachedCountries && cacheTimestamp && now - cacheTimestamp < CACHE_TTL) {
    return cachedCountries;
  }

  try {
    const res = await fetchWithTimeout(
      "https://restcountries.com/v3.1/all?fields=flags,name,population,region,capital,cca3",
      {},
      15000,
    );

    if (!res.ok) {
      throw new Response("Failed to load countries", {
        status: res.status,
      });
    }

    const countries = await res.json();

    // Cache on success only
    cachedCountries = countries;
    cacheTimestamp = now;

    return countries;
  } catch (error) {
    // AbortError / timeout / network issues
    throw new Response("Unable to load countries. Please try again later.", {
      status: 503,
    });
  }
}

const Home = () => {
  const countries = useLoaderData();
  const [searchParams] = useSearchParams();
  const navigation = useNavigation();

  const region = searchParams.get("region");
  const query = searchParams.get("q")?.toLowerCase() ?? "";

  const filteredCountries = countries.filter((country) => {
    const matchesRegion = region ? country.region === region : true;

    const matchesQuery = query
      ? country.name.official.toLowerCase().includes(query)
      : true;

    return matchesRegion && matchesQuery;
  });

  const isFiltering =
    navigation.state === "loading" && navigation.location?.search !== "";

  return (
    <main className="flex max-w-7xl flex-col gap-12 px-4 pt-6 pb-16 xl:px-0">
      <div className="flex flex-col gap-12 xl:flex-row xl:justify-between">
        <SearchBar />
        <RegionFilter />
      </div>

      <div className={isFiltering ? "pointer-events-none opacity-50" : ""}>
        <CountryList countries={filteredCountries} />
      </div>

      {isFiltering && <p className="text-(--color-input)">Filtering…</p>}
    </main>
  );
};
export default Home;
