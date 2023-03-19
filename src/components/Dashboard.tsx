/* Hooks */
import { FC, useState, useEffect } from 'react';
/* Components */
import BoxRow from './BoxRow';

interface Props {
  currentLetter: string;
  currentRow: number;
  currentStateBox: string;
  selectedWord: string;
}

const Dashboard: FC<Props> = ({ currentLetter, currentRow, currentStateBox, selectedWord }) => {
  const totalRows: Array<number> = new Array(5).fill(0);  
  const [currentWords, setCurrentWords] = useState<string[]>(new Array(5).fill(''));
  const [stateBoxes, setStateBoxes] = useState<string[]>(new Array(5).fill('idle'));

  useEffect(() => {
    const stateBoxesNew = [...stateBoxes];
    stateBoxesNew[currentRow] = currentStateBox;
    
    setStateBoxes(stateBoxesNew);
  }, [currentStateBox]);

  useEffect(() => {
    const currentWordsNew = [...currentWords];
    currentWordsNew[currentRow] = currentLetter.toLocaleLowerCase();

    setCurrentWords(currentWordsNew);
  }, [currentLetter, currentRow]);

  return (
    <div className='flex flex-col m-4 w100 items-center justify-center'>
      {
        totalRows.map((row, index) => (
          <BoxRow
            rowId={`row-${index}`}
            key={`row-${index}`}
            selectedWord={selectedWord}
            word={currentWords[index]}
            state={stateBoxes[index]}
            rowNumber={index}
          />
        ))
      }
    </div>
  )
}

export default Dashboard;