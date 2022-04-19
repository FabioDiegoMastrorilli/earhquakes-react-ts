import { Feature, Geometry } from "geojson";

export type EarthquakeNumericKeys =
  | "mag"
  | "time"
  | "updated"
  | "tsunami"
  | "sig"
  | "nst"
  | "dmin"
  | "rms"
  | "gap";

export type EarthquakeStringKeys =
  | "place"
  | "url"
  | "detail"
  | "status"
  | "net"
  | "code"
  | "ids"
  | "sources"
  | "types"
  | "magType"
  | "title";

export type EarthquakePropsNumberType = {
  readonly [K in EarthquakeNumericKeys]: number;
};

export type EarthquakePropsStringType = {
  readonly [K in EarthquakeStringKeys]: string;
};

export type EarthquakePropsType = EarthquakePropsNumberType &
  EarthquakePropsStringType;

export type MultiRangeFilterValueLimitType = {
  absolute: number;
  percentage: number;
};

export type MultiRangeFilterValueType =
  | [MultiRangeFilterValueLimitType, MultiRangeFilterValueLimitType]
  | null;

export type MultiRangeFilterType = {
  label?: string;
  matchKey: EarthquakeNumericKeys;
  type: "multiRange";
  value?: MultiRangeFilterValueType;
};

export type SelectFilterType = {
  label?: string;
  matchKey: EarthquakeStringKeys;
  type: "select";
  value?: string | null;
};

export type FilterType = SelectFilterType | MultiRangeFilterType;

export interface EarthquakesStateType {
  items: Feature<Geometry, EarthquakePropsType>[] | null;
  status: "idle" | "loading" | "failed";
  filters: FilterType[];
}
