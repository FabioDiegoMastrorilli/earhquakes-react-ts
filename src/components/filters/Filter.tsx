import { FilterType } from "../../slices/earthquakes.types";
import MultiRangeFilter from "./MultiRangeFilter";
import SelectFilter from "./SelectFilter";

export default function Filter(props: FilterType) {
  switch (props.type) {
    case "multiRange":
      return <MultiRangeFilter {...props} />;
    case "select":
      return <SelectFilter {...props} />;
  }
}
