import { useState, useEffect } from 'react';
import API from '../services/api';

const useFeauredMerchants = () => {
  const [merchants, setMerchants] = useState([]);
  const [loading, setLoading] = useState(false);
  const getFeaturedMerchants = async () => {
    try {
      setLoading(true);
      const { data } = await API.get('/api/brand/featured');
      setMerchants(data.value)
      setLoading(false)
    } catch(error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if(!merchants.length) {
      getFeaturedMerchants();
    }
  }, [merchants]);

  return {
    loading,
    merchants,
    getFeaturedMerchants
  }

};

export default useFeauredMerchants;
