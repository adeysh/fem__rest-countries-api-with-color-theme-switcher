import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Icon from "../Icon";

const DEBOUNCE_MS = 600;

const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const [localValue, setLocalValue] = useState(query);

  useEffect(() => {
    setLocalValue(query);
  }, [query]);

  // Debounced URL update
  useEffect(() => {
    if (localValue === query) return;

    const id = setTimeout(() => {
      setSearchParams((prev) => {
        if (localValue) prev.set("q", localValue);
        else prev.delete("q");
        return prev;
      });
    }, DEBOUNCE_MS);

    return () => clearTimeout(id);
  }, [localValue, query, setSearchParams]);

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center px-6">
        <Icon name="search" size={24} color="grey" />
      </div>

      <input
        type="search"
        name="country"
        id="country"
        aria-label="Search for a country"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder="Search for a country..."
        className="ease w-full rounded-md bg-(--color-element) px-4 py-4 ps-20 placeholder-gray-300 shadow-md transition-shadow duration-300 focus:shadow-xl focus:ring-2 focus:outline-none active:shadow-xl xl:w-150"
      />
    </div>
  );
};

export default SearchBar;
