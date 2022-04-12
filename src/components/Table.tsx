import { useMemo } from "react";
import { useAppSelector } from "../app/hooks";
import { isItemVisible } from "../utilities/filters";

export default function List() {
  const { filters, earthquakes } = useAppSelector((state) => state.earthquakes);

  const filteredEarthquakes = useMemo(() => {
    return (
      earthquakes?.filter((earthquake) => {
        for (const filter of filters) {
          if (!isItemVisible(filter, earthquake)) {
            return false;
          }
        }
        return true;
      }) || []
    );
  }, [earthquakes, filters]);

  return (
    <table aria-label="simple table">
      <thead>
        <tr>
          <td>id</td>
          <td>place</td>
          <td>mag</td>
          <td>magType</td>
        </tr>
      </thead>

      <tbody>
        {filteredEarthquakes?.map((item) => (
          <tr key={item.id}>
            <th scope="row">{item.id}</th>
            <td>{item.properties.place}</td>
            <td>{item.properties.mag}</td>
            <td>{item.properties.magType}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
