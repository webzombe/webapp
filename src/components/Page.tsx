import { useEffect, useState } from 'react';
import Sex from "../assets/sex.svg";

// Расширяем типы один раз — больше никаких ошибок
declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        initDataUnsafe: {
          user?: {
            id?: number;
            first_name?: string;
            last_name?: string;
            username?: string;
            phone_number?: string;  // появляется после успешного шеринга контакта
          };
        };
        ready: () => void;
        requestContact: () => void;
        onEvent: (eventType: string, callback: (payload?: any) => void) => void;
        offEvent: (eventType: string, callback: (payload?: any) => void) => void;
      };
    };
  }
}

export const Page = () => {
  const [isReady, setIsReady] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (!tg) return;

    tg.ready();
    setIsReady(true);

    // Проверяем, не поделился ли пользователь контактом раньше
    if (tg.initDataUnsafe.user?.phone_number) {
      setConfirmed(true);
    }

    // Обработчик события — срабатывает после нажатия «Поделиться контактом»
    const handler = (payload: { status: 'sent' | 'cancelled' }) => {
      if (payload.status === 'sent') {
        setConfirmed(true);
        console.log('Контакт получен!');
      } else {
        console.log('Пользователь отменил');
      }
    };

    tg.onEvent('contactRequested', handler);

    return () => {
      tg.offEvent('contactRequested', handler);
    };
  }, []);

  const requestContact = () => {
    window.Telegram?.WebApp.requestContact();
  };

  const alreadyConfirmed = confirmed || !!window.Telegram?.WebApp.initDataUnsafe.user?.phone_number;

  return (
    <div className="w-screen h-screen relative overflow-hidden">
      <img
        src="./src/assets/jopa.png"
        className="absolute inset-0 w-full h-full object-fill"
        alt=""
      />
      <div className="absolute inset-0 backdrop-blur-sm bg-white/10"></div>

      <div className="relative z-10 flex flex-col items-center justify-center gap-6 px-10 h-full">
        <img src={Sex} alt="" className="size-[50%] max-w-52 h-fit" />

        <div className="bg-white p-4 rounded-xl text-center shadow-[0_0_20px_rgba(0,0,0,0.4)] w-full">
          <span className="font-semibold">
            Attention! To continue, you must confirm that you are over 18
          </span>
        </div>

        <button
          onClick={requestContact}
          disabled={!isReady || alreadyConfirmed}
          className="bg-[#40a7e2] disabled:bg-gray-500 p-4 rounded-xl text-white font-semibold shadow-[0_0_20px_rgba(0,0,0,0.4)] w-full transition-all"
          style={{ opacity: isReady && !alreadyConfirmed ? 1 : 0.5 }}
        >
          {alreadyConfirmed
            ? 'Already confirmed'
            : isReady
            ? 'Confirm 18+'
            : 'Loading…'}
        </button>

        {alreadyConfirmed && (
          <div className="text-white text-2xl font-bold animate-pulse">
            Access granted!
          </div>
        )}
      </div>
    </div>
  );
};