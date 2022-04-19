import { Feature, Geometry } from "geojson";
import {
  EarthquakePropsType,
  FilterType,
  MultiRangeFilterType,
  SelectFilterType,
} from "../slices/earthquakes.types";

export function selectFilterEvaluator(
  { matchKey, value }: SelectFilterType,
  item: Feature<Geometry, EarthquakePropsType>
) {
  if (!value) {
    return true;
  }

  return item.properties[matchKey] === value;
}

export const getDomainValueFromPercentage = (
  percentage: number,
  min: number,
  max: number
) => {
  const range = max - min;

  return (percentage / 100) * range + min;
};

export function multiRangeFilterEvaluator(
  { matchKey, value }: MultiRangeFilterType,
  item: Feature<Geometry, EarthquakePropsType>
) {
  if (!value) {
    return true;
  }

  return (
    item.properties[matchKey] >= value[0].absolute &&
    item.properties[matchKey] <= value[1].absolute
  );
}

export function isItemVisible(
  filter: FilterType,
  item: Feature<Geometry, EarthquakePropsType>
): boolean {
  switch (filter.type) {
    case "select":
      return selectFilterEvaluator(filter, item);
    case "multiRange":
      return multiRangeFilterEvaluator(filter, item);
  }
}
