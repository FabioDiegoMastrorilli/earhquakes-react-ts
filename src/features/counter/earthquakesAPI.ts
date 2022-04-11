import { Earthquake, RemoteFilters } from "../../slices/earthquakes.types";

export const baseURL = '/fdsnws/event/1/query';

type JsonResponse = {
  features: Earthquake[]
}

export const defaultQueryParams = {
  eventtype: 'earthquake',
  format: 'geojson'
};

export function buildURL(filters: RemoteFilters, page: number, pageSize: number) {
  const url = new URL(baseURL, window.location.origin);

  const queryParams = {
    ...filters,
    ...defaultQueryParams
  }

  url.searchParams.set('offset', String(page));
  url.searchParams.set('limit', String(pageSize));

  Object.entries(queryParams).forEach(([name, value]) => {
    if(value) {
      url.searchParams.set(name, String(value));
    }
  })

  return url.toString();
};

const DEFAULT_PAGE_SIZE = 100;

export async function getData(filters: RemoteFilters, page = 1, pageSize = DEFAULT_PAGE_SIZE) {
  const formattedURL = buildURL(filters, page, pageSize);

  const response = await fetch(formattedURL);

  if (!response.ok) {
    const newError = await response.json();

    throw newError;
  }

  const parsedResponse = await response.json() as JsonResponse;

  return parsedResponse.features;
}
