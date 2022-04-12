import { useMemo } from "react";
import { Input, Label } from "reactstrap";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setFilterValue } from "../../slices/earthquakes";
import { SelectFilterType } from "../../slices/earthquakes.types";

export default function SelectFilter({
  label,
  matchKey,
  value,
  type,
}: SelectFilterType) {
  const { items } = useAppSelector((state) => state.earthquakes);
  const dispatch = useAppDispatch();

  const options = useMemo(() => {
    const optionsSet = new Set<string>();

    items?.forEach((item) => optionsSet.add(item.properties[matchKey]));

    return Array.from(optionsSet);
  }, [items, matchKey]);

  const selectId = `${matchKey}-filter-select`;

  return (
    <>
      <Label for={selectId}>{label || matchKey}</Label>

      <Input
        type="select"
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
      </Input>
    </>
  );
}
