import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import Form from './components/Form';
import List from './components/List';
import { fetchEarthquakes } from './slices/earthquakes';

function App() {
  const {filters, items, status, page} = useAppSelector((state) => state.earthquakes);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(fetchEarthquakes({
      filters: filters.remote,
      page
    }))
  }, [dispatch, page, filters.remote])

  return (
    <div className="App">
        <Form />

        {status === 'failed' && (
          <>failed</>
        )}

        {status === 'loading' && (
          <>loading</>
        )}

        {<List />}
        
    </div>
  );
}

export default App;
