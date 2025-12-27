import BorderCountries from "./BorderCountries";
import CountryFlag from "./CountryFlag";
import CountryInfo from "./CountryInfo";

const CountryDetails = ({ country, borderCountries = [] }) => {
  if (!country) return null;

  return (
    <section className="flex flex-col gap-(--country-details-gap) lg:flex-row">
      {/* Flag */}
      <div className="flex flex-1">
        <CountryFlag flags={country.flags} countryName={country.name.common} />
      </div>

      {/* Info + Borders */}
      <div className="flex flex-1 flex-col justify-center gap-12 py-8">
        <CountryInfo country={country} />
        <BorderCountries borderCountries={borderCountries} />
      </div>
    </section>
  );
};
export default CountryDetails;
