
interface Prop {
  onClickHelp: (key: boolean) => void
  setOpenStatistics: (key: boolean) => void
}

export default function Navbar({onClickHelp, setOpenStatistics}: Prop) {
  const handleHelpClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    onClickHelp(true);
  };

  const handleStatisticsClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    setOpenStatistics(true);
  };

  return (
    <div className="flex
      items-center justify-around
      bg-gray-light
      text-lg
      rounded-lg p-4 mb-8"
    >
      <div onClick={handleHelpClick} className="cursor-pointer">
        <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M27 13.5C27 17.0804 25.5777 20.5142 23.0459 23.0459C20.5142 25.5777 17.0804 27 13.5 27C9.91958 27 6.4858 25.5777 3.95406 23.0459C1.42232 20.5142 0 17.0804 0 13.5C0 9.91958 1.42232 6.4858 3.95406 3.95406C6.4858 1.42232 9.91958 0 13.5 0C17.0804 0 20.5142 1.42232 23.0459 3.95406C25.5777 6.4858 27 9.91958 27 13.5ZM9.2745 10.1807H10.6667C10.8996 10.1807 11.0852 9.99 11.1156 9.75881C11.2674 8.65181 12.0268 7.84519 13.3802 7.84519C14.5378 7.84519 15.5976 8.424 15.5976 9.81619C15.5976 10.8877 14.9664 11.3805 13.9691 12.1298C12.8334 12.9549 11.934 13.9185 11.9981 15.4828L12.0032 15.849C12.005 15.9597 12.0502 16.0653 12.1291 16.143C12.208 16.2206 12.3143 16.2641 12.4251 16.2641H13.7936C13.9055 16.2641 14.0128 16.2197 14.0919 16.1406C14.1711 16.0614 14.2155 15.9541 14.2155 15.8422V15.6651C14.2155 14.4534 14.6762 14.1007 15.9199 13.1574C16.9476 12.3761 18.0191 11.5087 18.0191 9.68794C18.0191 7.13813 15.8659 5.90625 13.5084 5.90625C11.3704 5.90625 9.02812 6.90187 8.86781 9.76388C8.8655 9.81837 8.87436 9.87276 8.89385 9.92371C8.91334 9.97465 8.94305 10.0211 8.98114 10.0601C9.01923 10.0992 9.06491 10.13 9.11536 10.1507C9.1658 10.1715 9.21996 10.1817 9.2745 10.1807ZM13.1979 21.0532C14.2273 21.0532 14.9344 20.3884 14.9344 19.4889C14.9344 18.5574 14.2256 17.9027 13.1979 17.9027C12.2124 17.9027 11.4952 18.5574 11.4952 19.4889C11.4952 20.3884 12.2124 21.0532 13.1996 21.0532H13.1979Z" fill="#818181"/>
        </svg>
      </div>

      <div className='text-3xl font-bold'>WORDLE</div>

      <div onClick={handleStatisticsClick} className="cursor-pointer">
        <svg width="40" height="36" viewBox="0 0 40 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4.93549" y="6" width="29.6129" height="24" rx="2" fill="black" fillOpacity="0.49"/>
          <path d="M13.1613 15L13.1613 24" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19.7419 18V24" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M26.3226 12V24" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  )
}
