import { useEffect, useRef, useState } from 'react'

export const useDataFetch = <T> (url: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dictionary, setDictionary] = useState<string[]>();
  const [error, setError] = useState<T>();
  const cancelRequest = useRef<boolean>(false);

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

    const headers = new Headers({
      'Content-Type': 'text/plain',
      'Accept': 'text/html',
    });

    fetch(url, {
      method: 'GET',
      cache: 'no-cache',
      headers,
    })
      .then((response) => response.text())
      .then((result) => {
        if (cancelRequest.current) { return }

        if (typeof result !== 'undefined') {
          const dataParsed:string[] = getValidWords(result);
          setDictionary(dataParsed);
        }
      })
      .catch((error) => {
        console.error(error.message);
        setError(error.message);        
      });

    return () => {
      cancelRequest.current = true
    }
  }, [url, ]);

  return [
    dictionary,
    error,
  ];
}
