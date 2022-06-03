import { useEffect, useState } from 'react';
import axios from 'axios';

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    axios
      .get(baseUrl)
      .then((result) => {
        setResources(result.data);
      })
      .catch((err) => {
        console.log(`Error: ${err.message} occured`);
      });
  }, [baseUrl]);

  const createResource = (resource) => {
    axios
      .post(baseUrl, resource)
      .then((res) => {
        const resourcesUpd = [...resources, res.data];

        setResources(resourcesUpd);
      })
      .catch((err) => {
        console.log(`Error: ${err.message} while creating resource`);
      });
  };

  const service = { createResource };

  return [resources, service];
};

export default useResource;
