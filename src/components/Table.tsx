import { useMemo } from "react";
import { Card, Table } from "reactstrap";
import { useAppSelector } from "../app/hooks";
import { isItemVisible } from "../utilities/filters";

export default function List() {
  const { filters, items } = useAppSelector((state) => state.earthquakes);

  const filteredItems = useMemo(() => {
    return (
      items?.filter((item) => {
        for (const filter of filters) {
          if (!isItemVisible(filter, item)) {
            return false;
          }
        }
        return true;
      }) || []
    );
  }, [items, filters]);

  if (!items) {
    return null;
  }

  return (
    <Card>
      <Table hover responsive striped className="mb-0">
        <thead>
          <tr>
            <td>ID</td>
            <td>Place</td>
            <td>Mag</td>
            <td className="text-end">MagType</td>
          </tr>
        </thead>

        <tbody>
          {filteredItems.length ? (
            filteredItems.map((item) => (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.properties.place}</td>
                <td>{item.properties.mag}</td>
                <td className="text-end">{item.properties.magType}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="text-center p-4" colSpan={4}>
                No results were found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Card>
  );
}
