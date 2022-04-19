import { Feature, Geometry } from "geojson";
import { EarthquakePropsType } from "../slices/earthquakes.types";
import {
  selectFilterEvaluator,
  getDomainValueFromPercentage,
  multiRangeFilterEvaluator,
} from "./filters";

const Earthquake: Feature<Geometry, EarthquakePropsType> = {
  geometry: {
    coordinates: [],
    type: "Point",
  },
  id: "test-id",
  properties: {
    mag: 20,
    place: "Pacific Ocean",
    time: 0,
    updated: 40,
    url: "",
    detail: "",
    status: "",
    tsunami: 3,
    sig: -2.3,
    net: "",
    code: "",
    ids: "",
    sources: "",
    types: "",
    nst: 0,
    dmin: 0,
    rms: 0,
    gap: 0,
    magType: "mg",
    title: "",
  },
  type: "Feature",
};

describe("filters utilities", () => {
  describe("selectFilterEvaluator", () => {
    it("must return true when an Earthquake object matches with the filter criteria", () => {
      const result = selectFilterEvaluator(
        { matchKey: "place", value: "Pacific Ocean", type: "select" },
        Earthquake
      );

      expect(result).toBe(true);
    });

    it("must return false when an Earthquake object does not match with the filter criteria", () => {
      const result = selectFilterEvaluator(
        { matchKey: "place", value: "Atlantic Ocean", type: "select" },
        Earthquake
      );

      expect(result).toBe(false);
    });
  });

  describe("getDomainValueFromPercentage", () => {
    it("must return a value in a given range", () => {
      const result = getDomainValueFromPercentage(50, 50, 100);

      expect(result).toBeLessThan(100);
      expect(result).toBeGreaterThan(50);
    });

    it("must return a value in a given range where bounds are possibily < 0", () => {
      const result = getDomainValueFromPercentage(50, -7, -1);

      expect(result).toBeLessThan(-1);
      expect(result).toBeGreaterThan(-7);
    });

    it("must calculate the right value", () => {
      const result = getDomainValueFromPercentage(0, 1, 100);

      expect(result).toBe(1);
    });

    it("must calculate the right value (2)", () => {
      const result = getDomainValueFromPercentage(25, 2, 6);

      expect(result).toBe(3);
    });

    it("must calculate the right value (3)", () => {
      const result = getDomainValueFromPercentage(20, -10, -5);

      expect(result).toBe(-9);
    });
  });

  describe("multiRangeFilterEvaluator", () => {
    it("must return true when an Earthquake object matches with the filter criteria", () => {
      const result = multiRangeFilterEvaluator(
        {
          matchKey: "tsunami",
          value: [
            {
              absolute: 2,
              percentage: Math.random(),
            },
            {
              absolute: 6,
              percentage: Math.random(),
            },
          ],
          type: "multiRange",
        },
        Earthquake
      );

      expect(result).toBe(true);
    });

    it("must return false when an Earthquake object does not match with the filter criteria", () => {
      const result = multiRangeFilterEvaluator(
        {
          matchKey: "tsunami",
          value: [
            {
              absolute: 4,
              percentage: Math.random(),
            },
            {
              absolute: 9,
              percentage: Math.random(),
            },
          ],
          type: "multiRange",
        },
        Earthquake
      );

      expect(result).toBe(false);
    });
  });
});
