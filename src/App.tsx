import { useAppDispatch, useAppSelector } from './app/hooks';

import Form from './components/Form';
import List from './components/Table';
import { useEffect } from 'react';
import { fetchEarthquakes } from './slices/earthquakes';

function App() {
  const {status} = useAppSelector((state) => state.earthquakes);
  const dispatch = useAppDispatch();

  useEffect(() => {
      dispatch(fetchEarthquakes());
  }, [dispatch])

  return (
    <>
          <Form />

          {status === 'failed' && (
            <>failed</>
          )}

          {status === 'loading' && (
            <>loading</>
          )}

          {<List />}
          </>
  );
}

export default App;
