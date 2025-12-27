import { Link } from "react-router";

const CountryCard = ({ country }) => {
  const { cca3, flags, name, population, region, capital } = country;

  const capitalName = capital?.[0] ?? "—";
  const altText = flags.alt || `${name.common} flag`;

  return (
    <Link
      to={`/country/${country.cca3}`}
      prefetch="intent"
      className="row-span-2 grid grid-rows-subgrid overflow-hidden rounded-md bg-(--color-element) shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg focus:outline-none focus-visible:ring-2"
    >
      {/* Flag */}
      <div className="aspect-3/2 w-full overflow-hidden">
        <img
          src={flags.svg}
          alt={altText}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 px-6 pt-6 pb-12">
        <h2 className="text-xl leading-tight font-extrabold">
          {name.official}
        </h2>

        <div className="space-y-1 font-light">
          <p>
            <span className="font-semibold">Population:</span>{" "}
            {population.toLocaleString()}
          </p>
          <p>
            <span className="font-semibold">Region:</span> {region}
          </p>
          <p>
            <span className="font-semibold">Capital:</span> {capitalName}
          </p>
        </div>
      </div>
    </Link>
  );
};
export default CountryCard;
