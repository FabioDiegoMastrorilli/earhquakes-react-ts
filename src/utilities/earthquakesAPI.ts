import { Earthquake } from "../slices/earthquakes.types";

export const baseURL = "/fdsnws/event/1/query";

type JsonResponse = {
  features: Earthquake[];
};

const DEFAULT_PAGE_SIZE = 500;

export const defaultQueryParams = {
  eventtype: "earthquake",
  format: "geojson",
  limit: String(DEFAULT_PAGE_SIZE),
};

export function buildURL() {
  const url = new URL(baseURL, window.location.origin);

  url.searchParams.set("limit", String(DEFAULT_PAGE_SIZE));

  Object.entries(defaultQueryParams).forEach(([name, value]) => {
    if (value) {
      url.searchParams.set(name, String(value));
    }
  });

  return url.toString();
}

export async function getData() {
  const formattedURL = buildURL();

  const response = await fetch(formattedURL);

  if (!response.ok) {
    const newError = await response.json();

    throw newError;
  }

  const parsedResponse = (await response.json()) as JsonResponse;

  return parsedResponse.features;
}
