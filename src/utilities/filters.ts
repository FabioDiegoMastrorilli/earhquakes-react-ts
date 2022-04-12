import { Earthquake, Filter, MultiRangeFilter, SelectFilter } from "../slices/earthquakes.types";

function selectFilterEvaluator({matchKey, value}: SelectFilter, item: Earthquake) {
    if(!value) {
        return true;
    }

    return item.properties[matchKey] === value
}


export const getDomainValueFromPercentage = (percentage: number, min: number, max: number) => {
    const range = max - min;
	
    return percentage / 100 * range + min ;
}

function multiRangeFilterEvaluator({matchKey, value}: MultiRangeFilter, item: Earthquake) {
    if(!value) {
        return true;
    }

    return item.properties[matchKey] >= value[0].absolute && item.properties[matchKey] <= value[1].absolute
}

export function isItemVisible(filter: Filter, item: Earthquake): boolean {
    switch (filter.type) {
        case 'select':
            return selectFilterEvaluator(filter, item);
        case 'multiRange':
            return multiRangeFilterEvaluator(filter, item);
        default:
            return false;
    }
}