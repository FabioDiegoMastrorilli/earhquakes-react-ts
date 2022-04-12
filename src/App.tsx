import { useAppDispatch, useAppSelector } from "./app/hooks";

import Form from "./components/Form";
import List from "./components/Table";
import { useEffect } from "react";
import { fetchEarthquakes } from "./slices/earthquakes";
import { Container } from "reactstrap";

function App() {
  const { status } = useAppSelector((state) => state.earthquakes);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchEarthquakes());
  }, [dispatch]);

  return (
    <Container className="my-4">
      <Form />

      {status === "failed" && <>failed</>}

      {status === "loading" && <>loading</>}

      <List />
    </Container>
  );
}

export default App;
