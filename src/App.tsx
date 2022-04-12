import { useAppDispatch, useAppSelector } from "./app/hooks";

import Form from "./components/Form";
import List from "./components/Table";
import { useEffect } from "react";
import { fetchEarthquakes } from "./slices/earthquakes";
import { Alert, Container, Spinner } from "reactstrap";

function App() {
  const { status } = useAppSelector((state) => state.earthquakes);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchEarthquakes());
  }, [dispatch]);

  return (
    <Container className="my-4">
      <Form />

      {status === "failed" && (
        <Alert color="danger">
          <strong>Error</strong> - Impossible to fetch data.
        </Alert>
      )}

      {status === "loading" && (
        <Spinner className="d-block m-auto my-5" color="primary" />
      )}

      <List />
    </Container>
  );
}

export default App;
