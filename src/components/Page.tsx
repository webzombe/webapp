import  { useEffect, useState } from 'react';
import Sex from "../assets/sex.svg";

// Объявляем типы глобально, чтобы TypeScript не ругался на window.Telegram
declare global {
  interface Window {
    Telegram: any;
  }
}

export const Page = () => {
  // 1. Используем useState для хранения объекта WebApp
  const [tg, setTg] = useState<any>(null);

  // 2. Используем useEffect, чтобы получить доступ к window только ПОСЛЕ загрузки компонента
  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
      const webApp = window.Telegram.WebApp;
      webApp.ready(); // Сообщаем Телеграму, что приложение готово
      setTg(webApp);
    } else {
      console.log("Telegram WebApp is not available (running in browser?)");
    }
  }, []);

  const requestContact = () => {
    // Если tg еще не загрузился, ничего не делаем
    if (!tg) return;

    tg.requestContact((shared: boolean) => {
      // 3. Исправляем ошибку 'shared is never read' — используем переменную в логе
      console.log("Статус шеринга контакта:", shared);

      if (shared) {
        // Логика успешной отправки
        // tg.sendData("ContactShared"); // Например
        console.log("Контакт успешно получен!");
      } else {
        console.log("Пользователь отказался");
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
          // Добавляем стиль отключенной кнопки, если Telegram API еще не готов
          disabled={!tg}
          style={{ opacity: tg ? 1 : 0.5 }}
        >
          <span className='font-semibold text-white'>
             {tg ? '🍓 confirm 🔞' : 'Loading...'}
          </span>
        </button>
      </div>
    </div>
  );
};