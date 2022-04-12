export type EarthquakePropsType = {
  mag: number;
  place: string;
  time: number;
  updated: number;
  url: string;
  detail: string;
  status: string;
  tsunami: number;
  sig: number;
  net: string;
  code: string;
  ids: string;
  sources: string;
  types: string;
  nst: number;
  dmin: number;
  rms: number;
  gap: number;
  magType: string;
  type: "earthquake";
  title: string;
};

export type EarthquakeType = {
  type: string;
  properties: EarthquakePropsType;
  geometry: {
    type: string;
    coordinates: [number, number, number];
  };
  id: string;
};

export type EarthquakePropsKeysType = keyof EarthquakePropsType;

export type KeyOfType<Type, Value> = {
  [Key in keyof Type]: Type[Key] extends Value ? Key : never;
}[keyof Type];

export type MultiRangeFilterValueLimitType = {
  absolute: number;
  percentage: number;
};

export type MultiRangeFilterValueType =
  | [MultiRangeFilterValueLimitType, MultiRangeFilterValueLimitType]
  | null;

export type MultiRangeFilterType = {
  label?: string;
  matchKey: KeyOfType<EarthquakePropsType, number>;
  type: "multiRange";
  value?: MultiRangeFilterValueType;
};

export type SelectFilterType = {
  label?: string;
  matchKey: KeyOfType<EarthquakePropsType, string>;
  type: "select";
  value?: string | null;
};

export type FilterType = SelectFilterType | MultiRangeFilterType;

export interface EarthquakesStateType {
  items: EarthquakeType[] | null;
  status: "idle" | "loading" | "failed";
  filters: FilterType[];
}
