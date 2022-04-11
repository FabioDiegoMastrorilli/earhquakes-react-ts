import { useMemo } from "react";
import { useAppSelector } from "../app/hooks"
import { FilterValue, LocalFilters } from "../slices/earthquakes.types";

export default function List() {
    const {items, filters} = useAppSelector(state => state.earthquakes);

    const filteredItems = useMemo(() => {
        return items?.filter((item) => {
            const filtersArray = Object.entries(filters.local) as [keyof LocalFilters, FilterValue][]
            
            return filtersArray.every(([key, value]) => item.properties[key] === value)
        }) || []
    }, [items, filters.local])

    return (
        <ul>
            {filteredItems.map(item => (
                <li key={item.id}>{item.properties.place}</li>
            ))}
        </ul>
    )
}
