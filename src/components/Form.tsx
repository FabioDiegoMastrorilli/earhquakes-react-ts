import { Card, Col, FormGroup, Row } from "reactstrap";
import { useAppSelector } from "../app/hooks";
import Filter from "./filters/Filter";

export default function Form() {
  const { filters } = useAppSelector((state) => state.earthquakes);

  return (
    <Card className="mb-4">
      <Row>
        {filters.map((filter) => (
          <Col key={filter.matchKey}>
            <FormGroup className="m-3">
              <Filter {...filter} />
            </FormGroup>
          </Col>
        ))}
      </Row>
    </Card>
  );
}
