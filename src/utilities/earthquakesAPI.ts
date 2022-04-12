import { EarthquakeType } from "../slices/earthquakes.types";

export const baseURL = "/fdsnws/event/1/query";

export type JsonResponse = {
  features: EarthquakeType[];
};

export const DEFAULT_PAGE_SIZE = 500;

export const defaultQueryParams = {
  eventtype: "earthquake",
  format: "geojson",
};

export function buildURL(pageSize: number) {
  const url = new URL(baseURL, window.location.origin);

  url.searchParams.set("limit", String(pageSize));

  Object.entries(defaultQueryParams).forEach(([name, value]) => {
    if (value) {
      url.searchParams.set(name, String(value));
    }
  });

  return url.toString();
}

export async function getData() {
  /**
   * No try/catch since the Promise rejection will be gracefully handled by
   * the extraReducers builder in earthquakesSlice.
   */

  const formattedURL = buildURL(DEFAULT_PAGE_SIZE);
  // const formattedURL = buildURL(20001); // to test a scenario where !response.ok

  const response = await fetch(formattedURL);

  if (!response.ok) {
    const error = await response.text();

    throw new Error(error);
  }

  const parsedResponse = (await response.json()) as JsonResponse;

  return parsedResponse.features;
}
