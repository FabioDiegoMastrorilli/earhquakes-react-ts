// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
import { EarthquakeType } from "./slices/earthquakes.types";

const EarthquakeBoilerplate: EarthquakeType = {
  geometry: {
    coordinates: [0, 0, 0],
    type: "",
  },
  id: "test-id",
  properties: {
    mag: 20,
    place: "",
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
    type: "earthquake",
    title: "",
  },
  type: "",
};

const earthquakes = [
  {
    ...EarthquakeBoilerplate,
    properties: {
      ...EarthquakeBoilerplate.properties,
      place: "Atlantic Ocean",
    },
  },
  {
    ...EarthquakeBoilerplate,
    properties: {
      ...EarthquakeBoilerplate.properties,
      place: "Pacific Ocean",
    },
  },
];

jest.spyOn(global, "fetch").mockImplementation(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ features: earthquakes }),
  } as Response)
);
