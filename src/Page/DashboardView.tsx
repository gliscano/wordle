import { FC, KeyboardEventHandler, useEffect, useState } from 'react';
/* Hooks */
import { useDataFetch } from '../hooks/useDataFetch';
import { useLocalstorage } from '../hooks/useLocalstorage';
// import { useKeyboard } from '../hooks/useKeyboard';
/* Views */
import HelpView from './HelpView';
/* Components */
import Dashboard from '../components/Dashboard';
import Keyboard from '../components/Keyboard';
import Navbar from '../components/Navbar';
import StatisticsView from './StatisticsView';

const url = "https://gitlab.com/d2945/words/-/raw/main/words.txt";

interface JsonResponse {
  dictionary: Array<string> | string;
}

type States = 'idle' | 'playing' | 'completed' | 'failed';

export const DashboardView: FC = () => {
  /* Hooks */
  const { dictionary } = useDataFetch<JsonResponse>(url);
  const { onboarding, setItemLocalstorage } = useLocalstorage();
  /* States */
  const [selectedWord, setSelectedWord] = useState<string>('');
  const [currentWord, setCurrentWord] = useState<string>('');
  const [currentStateBox, setCurrentStateBox] = useState<States>('idle');
  const [rowActived, setRowActive] = useState<number>(0);
  const [openHelpModal, setOpenHelpModal] = useState<boolean>(false);
  const [openStatisticsModal, setOpenStatisticsModal] = useState<boolean>(false);

  const onKeyPress = (key: string) => {
    console.log('teclado', key);
    
    let newWord = currentWord;

    if (key === 'Enter') {
      if (currentWord.length < 5) {
        setCurrentStateBox('failed');
        return;
      }

      setCurrentStateBox('completed');
      return;
    }
    
    if (key === 'Backspace') {
      if (currentWord.length === 0) { return; }

      const newWord = currentWord.slice(0, -1);
      setCurrentWord(newWord);
      return;
    }

    if (newWord.length >= 5 && currentStateBox === 'playing') {
      return;
    }

    if (newWord.length >= 5 && currentStateBox === 'completed') {
      newWord = '';
      setRowActive(rowActived + 1);

      if (rowActived > 5) {
        return;
      }
    }

    setCurrentStateBox('playing');
    setCurrentWord(newWord.concat(key));
  };

  const onKeyPressReal = (event: any) => {
    console.log(event, event);
    
    if (event.target && event.target.keyCode) {
      onKeyPress(event.target.keyCode);
    }
  };

  /* useKeyboard("keydown", onKeyPressReal); */

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * dictionary.length);
    const randomWord = dictionary[randomIndex];

    return randomWord;
  };

  const setWord = (word: string) => {
    setSelectedWord(word.toLocaleLowerCase());
  };

  const setOpenHelp = (open: boolean) => {    
    setOpenHelpModal(open);

    if (!open && onboarding) {
      setItemLocalstorage();
    }
  };

  const setOpenStatistics = (open: boolean) => {
    setOpenStatisticsModal(open);
  };

  useEffect(() => {
    if (onboarding) {
      setOpenHelpModal(true);
    }
  }, [onboarding])

  useEffect(() => {
    if (dictionary?.length) {
      const word = getRandomWord();
      
      setWord(word);
    }
  }, [dictionary]);

  return (
    <div className="w-full h-screen flex justify-center items-center text-3xl bg-white shadow-xl">
      {
        openHelpModal && (
          <HelpView onClickHelp={setOpenHelp} />
        )
      }
      {
        openStatisticsModal && (
          <StatisticsView setOpenStatistics={setOpenStatistics} />
        )
      }
      <div className='w-6/12 flex flex-col'>
        <Navbar onClickHelp={setOpenHelp} setOpenStatistics={setOpenStatistics} />
        <Dashboard
          currentLetter={currentWord}
          currentRow={rowActived}
          currentStateBox={currentStateBox}
          selectedWord={selectedWord}
        />
        <Keyboard onKeyPressed={onKeyPress} />
      </div>
    </div>
  );
}
