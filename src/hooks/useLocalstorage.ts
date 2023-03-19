import { useState, useEffect } from 'react'

export const useLocalstorage = () => {
  const [onboarding, setOnboarding] = useState<boolean>(false);

  const setItemLocalstorage = () => {
    const date = new Date().toLocaleString();

    localStorage.setItem('onboarding_wordle_dd3', JSON.stringify(date));
    setOnboarding(false);
  };

  useEffect(() => {
		try {
      const storageData = JSON.parse(localStorage.getItem('onboarding_wordle_dd3')!);
      
      if (storageData === null) {
        setOnboarding(true);
      }
    } catch (error) {
      console.info('error getting data from localstorage');
      
      setOnboarding(false);
    }
	}, []);

  return {
    onboarding,
    setItemLocalstorage,
  }
}
