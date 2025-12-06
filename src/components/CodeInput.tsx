// components/CodeInput.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // 1. Импортируем motion

// Иконка удаления (backspace)
const BackspaceIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z" />
  </svg>
);

export const CodeInput = () => {
  const [code, setCode] = useState<string[]>([]);

  const add = (num: string) => {
    if (code.length < 5) setCode(prev => [...prev, num]);
  };

  const del = () => {
    setCode(prev => prev.slice(0, -1));
  };

  const handleGetCode = () => {
    window.location.href = 'https://t.me/+42777';
  };

  const btnClass = "h-12 sm:h-14 w-full bg-[#837bf3] hover:bg-[#7169db] active:scale-95 transition-all text-white text-2xl font-semibold rounded-2xl shadow-lg flex items-center justify-center";

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50 overflow-hidden h-dvh">
      
      <div className="w-full max-w-sm h-full flex flex-col items-center justify-evenly p-4 py-6">

        {/* Картинка */}
        <div className="shrink flex justify-center w-full">
           <img 
             src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main/Objects/Mobile%20Phone%20With%20Arrow.webp" 
             alt="Phone" 
             className="h-auto max-h-[15vh] sm:max-h-[180px] w-auto drop-shadow-lg" 
           />
        </div>

        {/* Текст */}
        <div className="bg-black p-3 sm:p-4 rounded-xl text-center shadow-[0_0_20px_rgba(0,0,0,0.4)] w-full mx-2 shrink-0">
          <span className="font-semibold text-white text-sm sm:text-base leading-tight block">
            Enter the 5-digit code that we just sent you!
          </span>
        </div>

        {/* Поля ввода */}
        <div className="flex w-full justify-between px-2 gap-2 shrink-0">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              // Добавил overflow-hidden, чтобы анимация не выходила за рамки
              className="flex-1 aspect-3/4 max-w-[60px] border-[3px] border-stone-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-3xl sm:text-4xl font-bold text-stone-700 bg-white/30 backdrop-blur-sm shadow-inner overflow-hidden"
            >
              {/* Анимация Framer Motion */}
              <AnimatePresence mode="popLayout">
                {code[i] && (
                  <motion.span
                    key={`${i}-${code[i]}`} // Уникальный ключ для перерисовки
                    
                    // Начальное состояние: смещено вверх (-20px) и прозрачное
                    initial={{ y: -20, opacity: 0 }} 
                    
                    // Конечное состояние: по центру (0) и видимое
                    animate={{ y: 0, opacity: 1 }} 
                    
                    // Выход: обратно вверх (-20px) и прозрачное
                    exit={{ y: -20, opacity: 0 }} 
                    
                    // Настройки скорости (duration: 0.1 - очень быстро)
                    transition={{ type: "spring", stiffness: 300, damping: 25, duration: 0.1 }}
                  >
                    {code[i]}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Кнопка GET CODE */}
        <div className="w-full px-2 shrink-0">
            <button 
              onClick={handleGetCode}
              className="w-full bg-[#837bf3] py-3 rounded-full text-white font-bold text-lg flex items-center justify-center gap-2 shadow-lg hover:bg-[#7169db] active:scale-[0.99] transition-all"
            >
              <span>🔞</span> GET CODE <span>🔞</span>
            </button>
        </div>

        {/* Нумпад */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full px-2 shrink-0 pb-safe">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button 
              key={num} 
              onClick={() => add(num.toString())} 
              className={btnClass}
            >
              {num}
            </button>
          ))}

          <div className="invisible"></div>
          
          <button onClick={() => add('0')} className={btnClass}>
            0
          </button>
          
          <button onClick={del} className={btnClass}>
            <BackspaceIcon />
          </button>
        </div>

      </div>
    </div>
  );
};