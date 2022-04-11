export type EarthquakeProps = {
    mag: number,
    place: string,
    time: number,
    updated: number,
    tz: null,
    url: string,
    detail: string,
    felt: null,
    cdi: null,
    mmi: null,
    alert: null,
    status: string,
    tsunami: number,
    sig: number,
    net: string,
    code: string,
    ids: string,
    sources: string,
    types: string,
    nst: number,
    dmin: number,
    rms: number,
    gap: number,
    magType: string,
    type: "earthquake",
    title: string,
}

export type Earthquake = {
    type: string,
    properties: EarthquakeProps,
    geometry: {
        type: string,
        coordinates: [
            number,
            number,
            number
        ]
    },
    id: string
}


export type EarthquakePropsKeys = keyof EarthquakeProps;

export type FilterValue = string | number | null;

export type LocalFilters = {
    [name in EarthquakePropsKeys]?: FilterValue;
};

export type RemoteFilters = {
    [name: string]: FilterValue;
};

export interface EarthquakesState {
    items: Earthquake[] | null;
    status: 'idle' | 'loading' | 'failed';
    filters: {
        local: LocalFilters,
        remote: RemoteFilters,
    },
    page: number
}