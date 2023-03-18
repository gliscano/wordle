/* Hooks */
import { FC } from 'react';
import { useDataFetch } from '../hooks/useDataFetch';
/* Components */
import BoxRow from './BoxRow';

const url = "https://gitlab.com/d2945/words/-/raw/main/words.txt";

interface JsonResponse {
  data: Array<string>
}

const Dashboard: FC = () => {
  const totalRows: Array<number> = new Array(5).fill(0);
  const [dictionary, error] = useDataFetch<JsonResponse>(url);

  console.log('dashboard dictionary', dictionary);
  console.log('error', error);
  
  

  return (
    <div className='flex flex-col m-4 w100 items-center justify-center'>
      {
        totalRows.map((row, index) => (
          <BoxRow
            rowId={`row-${index}`}
            key={`row-${index}`}
            word=''
            status='empty'
            rowNumber={index}
          />
        ))
      }
    </div>
  )
}

export default Dashboard;