import React from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Keyboard from './components/Keyboard';

function App() {
  const onKeyPress = (key: string) => {
    console.log(key);
    
  };

  return (
    <div className="w-full h-screen flex justify-center items-center pb-5 text-3xl">
      <div className='w-6/12 flex flex-col'>
        <Navbar />
        <Dashboard />
        <Keyboard onKeyPressed={onKeyPress} />
      </div>
    </div>
  );
}

export default App;
