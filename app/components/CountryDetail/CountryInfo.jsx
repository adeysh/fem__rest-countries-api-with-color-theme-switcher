const CountryInfo = ({ country }) => {
  if (!country) return null;

  const {
    name,
    population,
    region,
    subregion,
    capital,
    tld,
    currencies,
    languages,
  } = country;

  const nativeName =
    Object.values(name.nativeName ?? {})[0]?.common ?? name.common;

  const currencyNames = Object.values(currencies ?? {})
    .map((c) => c.name)
    .join(", ");

  const languageNames = Object.values(languages ?? {}).join(", ");

  const formatNumber = (value) =>
    typeof value === "number" ? value.toLocaleString() : "—";

  return (
    <section className="flex w-full flex-col gap-10 lg:flex-row lg:gap-24">
      {/* Details */}
      <div className="flex w-full flex-col gap-8">
        <h1 className="text-3xl font-extrabold">{name.common}</h1>

        <div className="flex flex-col gap-12 font-light lg:flex-row lg:gap-20">
          {/* Left column */}
          <dl className="flex flex-col gap-3">
            <div>
              <dt className="inline font-semibold">Native Name:</dt>{" "}
              <dd className="inline">{nativeName}</dd>
            </div>

            <div>
              <dt className="inline font-semibold">Population:</dt>{" "}
              <dd className="inline">{formatNumber(population)}</dd>
            </div>

            <div>
              <dt className="inline font-semibold">Region:</dt>{" "}
              <dd className="inline">{region}</dd>
            </div>

            <div>
              <dt className="inline font-semibold">Sub Region:</dt>{" "}
              <dd className="inline">{subregion ?? "—"}</dd>
            </div>

            <div>
              <dt className="inline font-semibold">Capital:</dt>{" "}
              <dd className="inline">{capital?.[0] ?? "—"}</dd>
            </div>
          </dl>

          {/* Right column */}
          <dl className="flex flex-col gap-3">
            <div>
              <dt className="inline font-semibold">Top Level Domain:</dt>{" "}
              <dd className="inline">{tld?.[0] ?? "—"}</dd>
            </div>

            <div>
              <dt className="inline font-semibold">Currencies:</dt>{" "}
              <dd className="inline">{currencyNames || "—"}</dd>
            </div>

            <div>
              <dt className="inline font-semibold">Languages:</dt>{" "}
              <dd className="inline">{languageNames || "—"}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
};

export default CountryInfo;
