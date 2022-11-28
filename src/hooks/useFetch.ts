import { AxiosCall } from '../models/axios';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

const useFetchAndLoad = () => {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [message, setMessage] = useState('');
  let controller: AbortController;

  const callEndpoint = async (axiosCall: AxiosCall<any>) => {
    if (axiosCall.controller) controller = axiosCall.controller;
    setLoading(true);
    let result = {} as AxiosResponse<any>;
    try {
      result = await axiosCall.call;
      console.log("result axios try =>>>>>>", result);
    } catch (err: any) {
      console.log("result axios =>>>>>>", err.response);
      setMessage(err?.statusText);
      setLoading(false);
      setError(true);
      throw err;
    }
    setLoading(false);
    return result;
  };

  const cancelEndpoint = () => {
    setLoading(false);
    controller && controller.abort();
  };

  useEffect(() => {
    return () => {
      cancelEndpoint();
    };
    // eslint-disable-next-line
  }, []);

  return { isLoading, isError, message, callEndpoint };
};

export default useFetchAndLoad;