import React, { useEffect, useState } from "react";

type UseBaseFetchType<T> = {
  fetchCallback: () => Promise<T>;
};

function useBaseFetch<T>({ fetchCallback }: UseBaseFetchType<T>) {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await fetchCallback();
        setData(apiData);
      } catch (error) {
        setError("An error occurred");
      }
    };
  }, []);

  return {
    data,
    loading,
    error,
  };
}

export default useBaseFetch;
