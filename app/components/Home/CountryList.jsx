import CountryCard from "./CountryCard";

const CountryList = ({ countries = [] }) => {
  if (!countries.length) {
    return <p className="text-center opacity-70">No countries found.</p>;
  }

  return (
    <section className="grid grid-cols-1 place-items-center gap-10 px-10 md:grid-cols-2 md:px-0 lg:grid-cols-3 xl:grid-cols-4">
      {countries.map((country) => (
        <CountryCard key={country.cca3} country={country} />
      ))}
    </section>
  );
};
export default CountryList;
