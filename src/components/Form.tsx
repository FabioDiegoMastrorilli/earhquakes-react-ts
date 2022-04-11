import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setFilter } from "../slices/earthquakes";

export default function Form() {
    const {filters, items} = useAppSelector(state => state.earthquakes);
    const dispatch = useAppDispatch()

    const magTypes: string[] = useMemo(() => {
        const magTypesTemp = new Set<string>();

        items?.forEach(item => {
            magTypesTemp.add(item.properties.magType)
        })

        return Array.from(magTypesTemp);
    }, [items])

    return (
        <form>
            <div>
                <label>magnitude</label>
                <input
                    type="range"
                    min={13}
                    max={4564}
                    value={filters.remote?.magnitude || ''}
                    onChange={({target}) => {
                        dispatch(
                            setFilter({
                                name: 'magnitude',
                                value: target.value,
                                type: 'remote',
                            })
                        )
                    }} 
                />
            </div>
            <div>
                <label>magtype</label>
                <select
                    value={filters.local?.magType || ''}
                    onChange={({target}) => {
                        dispatch(
                            setFilter({
                                type: 'local',
                                value: target.value,
                                name: 'magType'
                            })
                        )
                    }}
                >
                    <option disabled></option>

                    {magTypes.map(magType => (
                        <option value={magType} key={magType}>{magType}</option>
                    ))}
                </select>
            </div>
        </form>
    )
}