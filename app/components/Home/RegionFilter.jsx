import { useEffect, useRef, useState, useTransition } from "react";
import { useSearchParams } from "react-router";
import Button from "../Button";
import DropdownItem from "../DropDownItem";

const REGIONS = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

const RegionFilter = () => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const [searchParams, setSearchParams] = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const dropdownRef = useRef(null);

  const selectedRegion = searchParams.get("region");

  const items = ["All Regions", ...REGIONS];

  function handleSelect(region) {
    setOpen(false);
    setActiveIndex(-1);

    startTransition(() => {
      setSearchParams((prev) => {
        if (region) prev.set("region", region);
        else prev.delete("region");
        return prev;
      });
    });
  }

  // Keyboard navigation
  function handleKeyDown(e) {
    if (!open) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % items.length);
        break;

      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => (i <= 0 ? items.length - 1 : i - 1));
        break;

      case "Enter":
      case " ": {
        e.preventDefault();
        const value = activeIndex === 0 ? null : items[activeIndex];
        handleSelect(value);
        break;
      }

      case "Escape": {
        setOpen(false);
        setActiveIndex(-1);
        break;
      }
    }
  }

  // Set initial active item when opened
  useEffect(() => {
    if (open) setActiveIndex(0);
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Close on click outside
  useEffect(() => {
    if (!open) return;

    const onClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  // Sync active item to selected item when opening
  useEffect(() => {
    if (!open) return;

    if (!selectedRegion) {
      setActiveIndex(0);
    } else {
      const idx = items.indexOf(selectedRegion);
      setActiveIndex(idx === -1 ? 0 : idx);
    }
  }, [open, selectedRegion]);

  return (
    <div ref={dropdownRef} className="relative inline-block self-start">
      {/* Toggle button */}
      <Button
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="true"
        icon="chevron-down-outline"
        gap={12}
        className="px-8 py-4"
      >
        {isPending ? "Filtering…" : (selectedRegion ?? "Filter by Region")}
      </Button>

      {/* Dropdown */}
      {open && (
        <div
          role="menu"
          tabIndex={-1}
          onKeyDown={handleKeyDown}
          className="absolute z-10 mt-2 w-full rounded-md border border-transparent bg-(--color-element) shadow-md"
        >
          <ul className="flex flex-col gap-2 px-4 py-4 font-medium">
            {items.map((item, index) => {
              const value = index === 0 ? null : item;

              const isSelected =
                value === null ? !selectedRegion : selectedRegion === value;

              const isActive = index === activeIndex;

              return (
                <li key={item}>
                  <DropdownItem
                    role="menuitem"
                    onSelect={() => handleSelect(value)}
                    isSelected={isSelected}
                    className={isActive ? "ring-2 ring-(--color-input)" : ""}
                  >
                    {item}
                  </DropdownItem>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
export default RegionFilter;
