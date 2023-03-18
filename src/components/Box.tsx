import { FC } from 'react'

interface Props {
  text: string;
  color: string;
  id: string
}

const Box:FC<Props> = ({ text, color, id }) => {
  return (
    <div
      id={id}
      key={id}
      className='w-20 h-20 m-2.5
        flex
        rounded-md
        bg-gray-30
        items-center justify-around'
    >
      {text}
    </div>
  )
}

export default Box;