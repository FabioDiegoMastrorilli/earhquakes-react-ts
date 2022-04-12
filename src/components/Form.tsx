import { useAppSelector } from "../app/hooks";
import Filter from "./filters/Filter";

export default function Form() {
  const { filters } = useAppSelector((state) => state.earthquakes);

  return (
    <form>
      {filters.map((filter) => (
        <Filter key={filter.matchKey} {...filter} />
      ))}
    </form>
  );
}
