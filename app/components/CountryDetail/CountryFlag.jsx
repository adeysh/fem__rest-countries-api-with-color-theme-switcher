const CountryFlag = ({ flags, countryName }) => {
  if (!flags?.svg) return null;

  return (
    <div className="aspect-3/2 w-full overflow-hidden rounded-md">
      <img
        src={flags.svg}
        alt={flags.alt || `${countryName} flag`}
        loading="lazy"
        decoding="async"
        className="h-full w-full rounded-md object-cover"
      />
    </div>
  );
};
export default CountryFlag;
