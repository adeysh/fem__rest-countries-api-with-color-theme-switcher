import { Link } from "react-router";

const BorderCountries = ({ borderCountries = [] }) => {
  return (
    <section className="flex flex-col gap-3 lg:flex-row lg:gap-6">
      <h3 className="text-xl font-semibold">Border Countries:</h3>

      <ul className="flex flex-wrap gap-x-3 gap-y-6 lg:items-center">
        {borderCountries?.length ? (
          borderCountries.map((country) => (
            <li key={country.cca3}>
              <Link
                to={`/country/${country.cca3}`}
                prefetch="intent"
                className="rounded-md bg-(--color-element) px-8 py-2 font-light shadow-md transition-shadow duration-300 hover:shadow-lg"
              >
                {country.name.common}
              </Link>
            </li>
          ))
        ) : (
          <span className="opacity-70">None</span>
        )}
      </ul>
    </section>
  );
};
export default BorderCountries;
