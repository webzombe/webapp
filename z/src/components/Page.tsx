import React from 'react';
// Removed unused imports and the invalid 'useTelegram'
import Sex from "../assets/sex.svg";

// 1. Tell TypeScript that Telegram exists on the window object
declare global {
  interface Window {
    Telegram: any;
  }
}

export const Page = () => {
  // Removed unused 'lp'
  const tg = window.Telegram.WebApp; 

  const requestContact = () => {
    // 2. Fixed logic: requestContact takes one callback with a boolean
    tg.requestContact((shared: boolean) => {
      if (shared) {
        console.log("Contact shared successfully");
        // Add logic here to send data to bot if needed
      } else {
        console.log("User rejected contact request");
      }
    });
  };

  return (
    <div className="w-screen h-screen relative overflow-hidden">
      <img 
        src="./src/assets/jopa.png"
        className="absolute inset-0 w-full h-full object-fill"
        alt=""
      />

      <div className="absolute inset-0 backdrop-blur-sm bg-white/10"></div>

      <div className="relative z-10 flex flex-col items-center place-content-center gap-6 px-10 h-full">
        <img src={Sex} alt="" className='size-[50%] max-w-52 h-fit'/>

        <div className='bg-white p-4 rounded-xl text-center shadow-[0_0_20px_rgba(0,0,0,0.4)] w-full'>
          <span className='font-semibold'>Attention! 🔞 To continue, you must confirm that you are over 18 😊</span>
        </div>

        <button 
          className='bg-[#40a7e2] p-4 rounded-xl text-center shadow-[0_0_20px_rgba(0,0,0,0.4)] w-full'
          onClick={requestContact}
        >
          <span className='font-semibold text-white'>🍓 confirm 🔞</span>
        </button>
      </div>
    </div>
  );
};