import { FC, useEffect, useRef, useState } from 'react';
/* Hooks */
import { useDataFetch } from '../hooks/useDataFetch';
import { useLocalstorage } from '../hooks/useLocalstorage';
import { useKeyboard } from '../hooks/useKeyboard';
/* Views */
import HelpView from './HelpView';
import StatisticsView from './StatisticsView';
/* Components */
import Dashboard from '../components/Dashboard';
import Navbar from '../components/Navbar';
import Keyboard from '../components/Keyboard';

const url = "https://gitlab.com/d2945/words/-/raw/main/words.txt";

interface JsonResponse {
  dictionary: Array<string> | string;
}

type States = 'idle' | 'playing' | 'completed' | 'failed';

export const DashboardView: FC = () => {
  /* Hooks */
  const { dictionary } = useDataFetch<JsonResponse>(url);
  const { onboarding, setItemLocalstorage } = useLocalstorage();
  const idTimeoutShowModal = useRef<NodeJS.Timeout | null>(null);
  const idTimeoutUpdateWord = useRef<NodeJS.Timeout | null>(null);
  /* States */
  const [currentStateBox, setCurrentStateBox] = useState<States>('idle');
  const [currentWord, setCurrentWord] = useState<string>('');
  const [openHelpModal, setOpenHelpModal] = useState<boolean>(false);
  const [openStatisticsModal, setOpenStatisticsModal] = useState<boolean>(false);
  const [rowActived, setRowActive] = useState<number>(0);
  const [selectedWord, setSelectedWord] = useState<string>('');
  const [timerToUpdateWord, setTimerToUpdate] = useState<number>(300);
  const [timeToUpdateText, setTimeToUpdateText] = useState<string>('00:00');
  const [totalPlays, setTotalPlays] = useState<number>(0);
  const [totalWins, setTotalWins] = useState<number>(0);
  /* Constants */
  const eventName = "keydown";
   
  const validateResult = () => {
    const winner = currentWord === selectedWord;
    let showModal = false;

    if (winner) {
      setTotalWins(totalPlays + 1);
      showModal = true;      
    } else if (rowActived >= 4) {
      setTotalPlays(totalPlays + 1);
      showModal = true;
    }

    if (showModal) {
      idTimeoutShowModal.current = setTimeout(() => {
        clearTimeout(idTimeoutShowModal.current!);

        setOpenStatistics(true);
      }, 1000);
    }

    return ;
  };

  /**
   * If the user presses the enter key, check if the word is valid. If it is, set the state to
   * completed. If it isn't, set the state to failed. If the user presses the backspace key, remove the
   * last letter from the word. If the user presses any other key, add it to the word
   * @param {string} key - string - The key that was pressed.
   */
  const onKeyPress = (key: string) => {  
    let newWord = currentWord;

    if (key === 'Enter') {
      if (currentWord.length < 5) {
        setCurrentStateBox('failed');
        return;
      }

      setCurrentStateBox('completed');
      validateResult();
      return;
    }
    
    if (key === 'Backspace') {
      if (currentWord.length === 0 || currentStateBox !== 'playing') { return; }

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

  useKeyboard({ eventName , onKeyPress });

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

  const startTimerToUpdateWord = () => {  
    idTimeoutUpdateWord.current = setTimeout(() => {
      setTimerToUpdate(prevCount => prevCount - 1);
      
      if (timerToUpdateWord <= 0) {
        clearTimeout(idTimeoutUpdateWord.current!);

        /* Reload page is a workaround by time,
          best way, create reset view function and clear all states */
        window.location.reload();
        return;
      }
    }, 1000);    
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

      startTimerToUpdateWord();
    }
  }, [dictionary]);

  useEffect(() => {
    let minutes = Math.floor(timerToUpdateWord / 60);
    let seconds = timerToUpdateWord % 60;   
    
    const minutesText = (minutes >= 0) ? minutes.toString().padStart(2, '0') : '00';
    const secondsText = (seconds >= 0) ? seconds.toString().padStart(2, '0') : '00';
    const timerText = `${minutesText}:${secondsText}`;

    setTimeToUpdateText(timerText);
    startTimerToUpdateWord();    

    return () => clearInterval(idTimeoutUpdateWord.current!)
  }, [timerToUpdateWord])

  return (
    <div className="w-full h-screen flex justify-center items-center text-3xl bg-white shadow-xl">
      {
        openHelpModal && (
          <HelpView onClickHelp={setOpenHelp} />
        )
      }
      {
        openStatisticsModal && (
          <StatisticsView
            setOpenStatistics={setOpenStatistics}
            totalPlays={totalPlays}
            totalWins={totalWins}
            selectedWord={selectedWord}
            currentStateBox={currentStateBox}
            rowActived={rowActived}
            timeToUpdateText={timeToUpdateText}
          />
        )
      }
      <div className='w-6/12 flex flex-col scale-up-center'>
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
