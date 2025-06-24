import { isAxiosError } from "axios";
import { useEffect, useState } from "react";

export type UseQuery = {
  loading: boolean;
  errorMessage: string;
};

type Props<D> = {
  setDataState: (data: D) => void;
  queryFn(): Promise<D>;
};

export default function useQuery<D>(props: Props<D>): UseQuery {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    try {
      setLoading(true);
      const fn = async () => {
        const res = await props.queryFn();
        props.setDataState(res);
      };
      fn();
    } catch (err) {
      if (isAxiosError(err)) {
        setError(err?.response?.data || "An error occurred when making request");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    errorMessage: error,
  };
}
