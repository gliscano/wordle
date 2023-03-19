import { FC, useEffect, useState } from 'react';
/* Hooks */
import { useDataFetch } from '../hooks/useDataFetch';
/* Views */
import HelpView from './HelpView';
/* Components */
import Dashboard from '../components/Dashboard';
import Keyboard from '../components/Keyboard';
import Navbar from '../components/Navbar';

const url = "https://gitlab.com/d2945/words/-/raw/main/words.txt";

interface JsonResponse {
  dictionary: Array<string> | string;
}

type States = 'idle' | 'playing' | 'completed' | 'failed';

export const DashboardView: FC = () => {
  const { dictionary } = useDataFetch<JsonResponse>(url);
  const [selectedWord, setSelectedWord] = useState<string>('');
  const [currentWord, setCurrentWord] = useState<string>('');
  const [currentStateBox, setCurrentStateBox] = useState<States>('idle');
  const [rowActived, setRowActive] = useState<number>(0);
  const [openHelpModal, setOpenHelpModal] = useState<boolean>(false);

  const onKeyPress = (key: string) => {
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

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * dictionary.length);
    const randomWord = dictionary[randomIndex];

    return randomWord;
  };

  const setWord = (word: string) => {
    console.log('word', word.toLocaleLowerCase());
    setSelectedWord(word.toLocaleLowerCase());
  };

  const setOpenHelp = (open: boolean) => {
    console.log('open', open);
    
    setOpenHelpModal(open);
  };

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
      <div className='w-6/12 flex flex-col'>
        <Navbar onClickHelp={setOpenHelp} />
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
