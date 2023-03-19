import { language_ES as lang } from "../language/language_ES";
import Box from "../components/Box";

const HelpView = () => {
  const example_1 = {
    word: 'GATOS',
    position: 0,
    color: "bg-green"
  };

  const example_2 = {
    word: 'VOCAL',
    position: 2,
    color: "bg-yellow"
  };

  const example_3 = {
    word: 'CANTO',
    position: 4,
    color: "bg-gray-30"
  };

  return (
    <div className="w-full h-screen flex justify-center items-center pb-5 text-lg z-10 absolute">
      <div className='w-6/12 h-full flex flex-col justify-center px-10 bg-gray-10 shadow-xl'>
        <div className="text-3xl font-bold text-center mb-8">{lang.help_title}</div>
        <div className="mb-4">{lang.paragraph_1}</div>
        <div className="mb-4">{lang.paragraph_2}</div>
        <div className="mb-4">{lang.paragraph_3}</div>
        <div className="font-bold">{lang.examples}</div>
        <div className='flex flex-row text-3xl font-extrabold my-2'>
          {
            example_1.word.split('').map((letter, index) => (
              <Box
                id={`box-help-1-${index}`}
                key={`box-help-1-${index}`}
                text={letter}
                color={(example_1.position === index) ? example_1.color : 'bg-white border-black'}
              />
            ))
          }
        </div>
        <div>{lang.example_1}</div>
        <div className='flex flex-row text-3xl font-extrabold my-2'>
          {
            example_2.word.split('').map((letter, index) => (
              <Box
                id={`box-help-2-${index}`}
                key={`box-help-2-${index}`}
                text={letter}
                color={(example_2.position === index) ? example_2.color : 'bg-white border-black'}
              />
            ))
          }
        </div>
        <div>{lang.example_2}</div>
        <div className='flex flex-row text-3xl font-extrabold my-2'>
          {
            example_3.word.split('').map((letter, index) => (
              <Box
                id={`box-help-3-${index}`}
                key={`box-help-3-${index}`}
                text={letter}
                color={(example_3.position === index) ? example_3.color : 'bg-white border-black'}
              />
            ))
          }
        </div>
        <div className="mb-8">{lang.example_3}</div>
        <div className="mb-8">{lang.paragraph_4}</div>
        <div className="mb-8">{lang.footer}</div>
        <div className="flex justify-around bg-green rounded-lg w-max py-2 px-8">{lang.btn_play}</div>
      </div>
    </div>
  )
}

export default HelpView;