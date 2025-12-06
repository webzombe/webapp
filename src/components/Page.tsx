import { useEffect, useMemo, useState } from 'react';
import { useRawInitData } from '@tma.js/sdk-react';
import { requestContact } from '@tma.js/sdk'; // Импорт метода
import Sex from "../assets/sex.svg";
import Jopa from "../assets/jopa.png"; // Импорт вашего фонового изображения (измените путь, если нужно)

export const Page = () => {
  const rawInitData = useRawInitData();
  const [confirmed, setConfirmed] = useState(false);

  // Unsafe parsing raw init data для проверки phone_number
  const initData = useMemo(() => {
    if (!rawInitData) return null;
    const params = new URLSearchParams(rawInitData);
    const userStr = params.get('user');
    if (!userStr) return null;
    try {
      return { user: JSON.parse(decodeURIComponent(userStr)) };
    } catch (e) {
      console.error('Ошибка парсинга init data:', e);
      return null;
    }
  }, [rawInitData]);

  const hasContact = !!initData?.user?.phone_number;

  const requestUserContact = async () => {
    try {
      const response = await requestContact();
      if (response) {
        console.log('Контакт получен:', response.contact.phone_number);
        setConfirmed(true);
      } else {
        console.log('Пользователь отказался');
      }
    } catch (error) {
      console.error('Ошибка запроса контакта:', error);
    }
  };

  return (
    <div className="w-screen h-screen relative overflow-hidden">
      <img
        src={Jopa} // Теперь используем импортированный модуль
        className="absolute inset-0 w-full h-full object-fill"
        alt="Фон"
      />
      <div className="absolute inset-0 backdrop-blur-sm bg-white/10"></div>
      <div className="relative z-10 flex flex-col items-center justify-center gap-6 px-10 h-full">
        <img src={Sex} alt="" className="size-[50%] max-w-52 h-fit" />
        <div className="bg-white p-4 rounded-xl text-center shadow-[0_0_20px_rgba(0,0,0,0.4)] w-full">
          <span className="font-semibold">Attention! 🔞 To continue, you must confirm that you are over 18 😊</span>
        </div>
        <button
          className="bg-[#40a7e2] p-4 rounded-xl text-center shadow-[0_0_20px_rgba(0,0,0,0.4)] w-full text-white font-semibold"
          onClick={requestUserContact}
          disabled={confirmed || hasContact}
          style={{ opacity: (confirmed || hasContact) ? 0.5 : 1 }}
        >
          {confirmed || hasContact ? 'Already confirmed' : '🍓 confirm 🔞'}
        </button>
        {(confirmed || hasContact) && (
          <div className="text-white text-lg font-bold animate-pulse">
            Access granted!
          </div>
        )}
      </div>
    </div>
  );
};