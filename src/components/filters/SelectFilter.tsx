import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { earthquakesSlice, setFilterValue } from "../../slices/earthquakes";
import { SelectFilterType } from "../../slices/earthquakes.types";

export default function SelectFilter({
  matchKey,
  value,
  type,
}: SelectFilterType) {
  const { earthquakes } = useAppSelector((state) => state.earthquakes);
  const dispatch = useAppDispatch();

  const options = useMemo(() => {
    const optionsSet = new Set<string>();

    earthquakes?.forEach((earthquake) =>
      optionsSet.add(earthquake.properties[matchKey])
    );

    return Array.from(optionsSet);
  }, [earthquakes, matchKey]);

  return (
    <>
      <label>{matchKey}</label>

      <select
        value={value || ""}
        onChange={({ target }) => {
          dispatch(setFilterValue({ matchKey, type, value: target.value }));
        }}
      >
        <option value=""></option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
}
