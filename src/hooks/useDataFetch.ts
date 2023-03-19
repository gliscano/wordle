import { useEffect, useRef, useState } from 'react';
import { catalogData } from '../dataBackup/data'

export const useDataFetch = <T> (url: string) => {
  const [dictionary, setDictionary] = useState<string[]>([]);
  const [error, setError] = useState<T>();
  const cancelRequest = useRef<boolean>(false);
  let isFetching = false;

  /**
   * It takes a string of words separated by new lines, and returns an array of words that are 5
   * characters long
   * @param {string} catalog - string - the string of words that we want to filter
   * @returns An array of words that are 5 characters long.
   */
  const getValidWords = (catalog: string) => {
    const separateData = catalog.split(/\r?\n|\r|\n/g);
    const validatedData = separateData.filter((word) => word.length === 5);

    return validatedData;
  };

  useEffect(() => {
    cancelRequest.current = false;

    if (isFetching) { return; }

    const headers = new Headers({
      'Content-Type': 'text/plain',
      'Accept': 'text/html',
    });

    isFetching = true;

    fetch(url, {
      method: 'GET',
      cache: 'no-cache',
      headers,
    })
      .then((response) => response.text())
      .then((result) => {
        if (cancelRequest.current || dictionary.length) { return }

        if (typeof result !== 'undefined') {
          const dataParsed:string[] = getValidWords(result);

          setDictionary(dataParsed);
        }
      })
      .catch((error) => {
        console.info('Error getting data from Gitlab');
        console.info('================================');
        console.info('>>> Getting data from local backup');
        console.info('================================');
        
        setError(error.message);
        setDictionary(catalogData);
      })
      .finally(() => {
        isFetching = false;
      });

    return () => {
      cancelRequest.current = true
    }
  }, []);

  return {
    dictionary,
    error,
  };
}
