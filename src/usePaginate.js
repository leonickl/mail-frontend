import { useState } from "react";
import { useFetch } from "./useFetch"; // Import your existing useFetch hook

export function usePaginate(endpoint, limit, search) {
  const [page, setPage] = useState(1);

  const { data, loading, setLoading, error } = useFetch(
    `${endpoint}?page=${page}&limit=${limit}&search=${search}`
  );

  const pagination = data
    ? {
        currentPage: data.current_page,
        totalPages: data.last_page,
        nextPage: data.next_page_url
          ? () => {
              setLoading(true);
              setPage((prev) => prev + 1);
            }
          : null,
        prevPage: data.prev_page_url
          ? () => {
              setLoading(true);
              setPage((prev) => prev - 1);
            }
          : null,
      }
    : {};

  return {
    data: data?.data,
    loading: loading,
    error,
    pagination,
    setPage,
  };
}
