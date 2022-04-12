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

export type KeyOfType<Type, Value> = {[Key in keyof Type]: Type[Key] extends Value ? Key: never}[keyof Type];

export type MultiRangeFilterValueLimit = {
    absolute: number,
    percentage: number
}

export type MultiRangeFilterValue = [MultiRangeFilterValueLimit, MultiRangeFilterValueLimit] | null

export type MultiRangeFilter = {
    type: 'multiRange',
    matchKey: KeyOfType<EarthquakeProps, number>,
    value?: MultiRangeFilterValue
}

export type SelectFilter = {
    type: 'select',
    matchKey: KeyOfType<EarthquakeProps, string>,
    value?: string | null
}

export type Filter = SelectFilter | MultiRangeFilter;

export interface EarthquakesState {
    earthquakes: Earthquake[] | null;
    status: 'idle' | 'loading' | 'failed';
    filters: Filter[]
}