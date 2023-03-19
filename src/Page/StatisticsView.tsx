import { language_ES as lang } from "../language/language_ES";

interface Prop {
  currentStateBox: string;
  selectedWord: string;
  rowActived: number;
  totalPlays: number;
  totalWins: number;
  setOpenStatistics: (key: boolean) => void;
}

const StatisticsView = ({ currentStateBox, totalPlays, totalWins, selectedWord, rowActived, setOpenStatistics }: Prop) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setOpenStatistics(false);
  }

  return (
    <div className="w-full h-screen flex justify-center items-center py-4 text-lg z-10 absolute scale-up-center">
      <div className='w-6/12 h-min
        flex flex-col justify-center
        px-10 py-10
        rounded-2xl border border-gray-300
        bg-gray-10 shadow-xl'
      >
        <div className="text-3xl font-bold text-center mb-8">{lang.statistics_title}</div>
        <div className="flex flex-row justify-around mb-8">
          <div className="flex flex-col items-center">
            <div className="mb-4 text-4xl font-bold">{totalPlays}</div>
            <div className="mb-4">{lang.games_played}</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="mb-4 text-4xl font-bold">{totalWins}</div>
            <div className="mb-4">{lang.game_won}</div>
          </div>
        </div>
        { (currentStateBox === 'completed' && rowActived >= 4) && (
            <div className="flex flex-col items-center mb-2">
              { selectedWord.toLocaleUpperCase() }
            </div>
          )
        }
        <div className="flex flex-col items-center mb-8">
          <div className="mb-4">{lang.next_word}</div>
          <div className="font-bold">04:10</div>
        </div>
        <div className="w-full flex justify-center font-center">
          <button
            key="btn-help-play"
            onClick={handleClick}
            className="flex bg-green rounded-lg py-2 px-12 mb-2 font-bold text-white"
          >
            {lang.btn_accept}
          </button>
        </div>
      </div>
    </div>
  )
}

export default StatisticsView;