import { useState } from 'react';

export const CodeInput = () => {
  const [code, setCode] = useState('');

  const handlePress = (num: string) => {
    if (code.length < 6) {
      setCode(prev => prev + num);
    }
  };

  const handleDelete = () => {
    setCode(prev => prev.slice(0, -1));
  };

  return (
    <div style={{ textAlign: 'center', fontFamily: 'sans-serif' }}>
      {/* Заголовок */}
      <div style={{ marginBottom: '30px', fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>
        Attention! 🔞 To continue, you must confirm that you are over 18 😊
      </div>

      {/* Поле ввода кода */}
      <div style={{ marginBottom: '40px' }}>
        <input
          type="text"
          value={code}
          readOnly
          placeholder="••••••"
          style={{
            fontSize: '32px',
            letterSpacing: '12px',
            textAlign: 'center',
            width: '240px',
            padding: '10px',
            border: 'none',
            borderBottom: '2px solid #fff',
            background: 'transparent',
            color: '#fff',
            outline: 'none',
          }}
        />
      </div>

      {/* Нумпад */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 80px)', gap: '20px', justifyContent: 'center' }}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
          <button
            key={n}
            onClick={() => handlePress(n.toString())}
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              border: '2px solid #fff',
              background: 'transparent',
              color: '#fff',
              fontSize: '32px',
              cursor: 'pointer',
            }}
          >
            {n}
          </button>
        ))}

        {/* Пустая ячейка */}
        <div />

        {/* 0 */}
        <button
          onClick={() => handlePress('0')}
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            border: '2px solid #fff',
            background: 'transparent',
            color: '#fff',
            fontSize: '32px',
            cursor: 'pointer',
          }}
        >
          0
        </button>

        {/* Кнопка удаления ← */}
        <button
          onClick={handleDelete}
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            border: '2px solid #fff',
            background: 'transparent',
            color: '#fff',
            fontSize: '32px',
            cursor: 'pointer',
          }}
        >
          ←
        </button>
      </div>
    </div>
  );
};