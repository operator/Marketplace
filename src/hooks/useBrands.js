/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from 'react';
import API from '../services/api';

const useBrands = (limit=10) => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const getBrands = useCallback(async (search) => {
    try {
      setLoading(true);
      const { data } = await API.get('/api/brand/list', { search, limit, page });
      if(page === 1) {
        setBrands(data.value);
      } else {
        setBrands([...brands, ...data.value]);
      }
      setHasMore(data.page < data.totalPages)
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }, [page]);

  const loadNextPage = () => {
    if(hasMore) {
      setPage(page + 1)
    }
  }

  useEffect(() => {
    getBrands()
  }, [getBrands])

  return {
    brands,
    loading,
    hasMore,
    getBrands,
    loadNextPage
  }
};

export default useBrands;
