import { useState, useEffect } from 'react';
import axios from 'axios';

export const useCountry = (name) => {
  const [country, setCountry] = useState();

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v2/name/${name}?fullText=true`)
      .then((response) => {
        console.log('response', response.data);
        setCountry(response.data);
      });
  }, [name]);

  return country;
};
