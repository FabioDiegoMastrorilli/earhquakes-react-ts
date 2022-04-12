import earthquakesReducer, {
  setFilterValue,
  initialState,
} from "./earthquakes";

import { MultiRangeFilterType, SelectFilterType } from "./earthquakes.types";

describe("earthquakes reducer", () => {
  it("must handle initial state", () => {
    expect(earthquakesReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  it("must update filters values - MultiRange", () => {
    const expectedFilter: MultiRangeFilterType = {
      label: "Magnitude",
      matchKey: "mag",
      type: "multiRange",
      value: [
        {
          absolute: Math.random(),
          percentage: Math.random(),
        },
        {
          absolute: Math.random(),
          percentage: Math.random(),
        },
      ],
    };

    const actual = earthquakesReducer(
      initialState,
      setFilterValue(expectedFilter)
    );

    const updated = actual.filters.find((filter) => filter.matchKey === "mag");

    expect(updated).toEqual(expectedFilter);
  });

  it("must update filters values - Select", () => {
    const expectedFilter: SelectFilterType = {
      matchKey: "magType",
      type: "select",
      value: "testValue",
    };

    const actual = earthquakesReducer(
      initialState,
      setFilterValue(expectedFilter)
    );

    const updated = actual.filters.find(
      (filter) => filter.matchKey === "magType"
    );

    expect(updated).toEqual(expectedFilter);
  });
});
