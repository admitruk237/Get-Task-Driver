import axios from 'axios';
import { useEffect, useState } from 'react';

const settings = {
  withCredentials: true,
};

const TestRequest = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
      .then((response) => setData(response.data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <h3>Test API Request</h3>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default TestRequest;
