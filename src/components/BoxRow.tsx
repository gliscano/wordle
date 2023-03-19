import { FC } from 'react'
import { useState, useEffect } from 'react';
/* Components */
import Box from './Box';

interface Props {
  rowId: string;
  rowNumber: number;
  state: string;
  word: string;
  selectedWord: string;
}

const BoxRow: FC<Props> = ({ rowId, rowNumber, state, word, selectedWord }) => {
  const boxPerRow = 5;
  const [emptyBoxes, setEmptyBoxes] = useState<number>(5);

  const getColor = (letter: string, index: number): string => {
    if (state === 'failed') {
      return 'bg-gray-30 shake-horizontal';
    }

    const animationClass = 'flip-2-ver-right-1';
    let colorClass = 'bg-gray';

    if (selectedWord?.includes(letter)) {
      colorClass = (selectedWord[index] === letter) ? 'bg-green' : 'bg-yellow'
    }

    return `${colorClass} ${animationClass}`;
  };

  useEffect(() => {   
    const emptyBoxes = boxPerRow - word.length;
    setEmptyBoxes(emptyBoxes);
  }, [word])

  return (
    <div id={rowId} className='flex flex-row text-3xl font-extrabold'>
      {
        word.split('').map((letter, index) => (
          <Box
            id={`${rowId}-box-${index}`}
            key={`${rowNumber}-box-${index}`}
            text={letter.toLocaleUpperCase()}
            color={(state === 'completed' || state === 'failed') ? getColor(letter, index) : "bg-gray-30 shadow-drop-center"}
          />
        ))
      }
      {
        (word?.length < 5) && Array.from(Array(emptyBoxes)).map((_, index) => (
          <Box
            id={`${rowId}-box-${index}`}
            key={`${rowNumber}-box-${index}`}
            text=""
            color="bg-gray-30"
          />
        ))
      }
    </div>
  );
}

export default BoxRow;