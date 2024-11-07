import { useState, useEffect } from 'react';
import { API_URLS } from '../../Apis/Globalapi';

const useMultiFetch = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const fetchPromises = API_URLS.map((url) => fetch(url).then((response) => response.json()));
        const results = await Promise.all(fetchPromises);
        setData(results);
        console.log(data)
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useMultiFetch;
