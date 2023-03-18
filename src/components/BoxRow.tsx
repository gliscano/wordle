import React, { FC } from 'react'
import Box from './Box';

interface Props {
  rowId: string;
  rowNumber: number;
  status: string;
  word: string;
}

const BoxRow: FC<Props> = ({ rowId, rowNumber, status, word }) => {
  const splitWord = word.split('');

  return (
    <div id={rowId} className='flex flex-row text-3xl font-extrabold'>
      {
        splitWord.map((letter, index) => (
          <Box
            id={`${rowId}-box-${index}`}
            key={`${rowNumber}-box-${index}`}
            text={letter}
            color="gray"
          />
        ))
      }
    </div>
  );
}

export default BoxRow;