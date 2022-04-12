import {
  EarthquakeType,
  FilterType,
  MultiRangeFilterType,
  SelectFilterType,
} from "../slices/earthquakes.types";

export function selectFilterEvaluator(
  { matchKey, value }: SelectFilterType,
  item: EarthquakeType
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
  item: EarthquakeType
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
  item: EarthquakeType
): boolean {
  switch (filter.type) {
    case "select":
      return selectFilterEvaluator(filter, item);
    case "multiRange":
      return multiRangeFilterEvaluator(filter, item);
  }
}
