import './App.css'
import Jopa from "./assets/jopa.png";
import { CodeInput } from './components/CodeInput';

function App() {
  return (
    <div className="w-screen h-screen relative overflow-hidden flex items-center place-content-center">
      <img
        src={Jopa}
        className="absolute inset-0 w-full h-full object-fill"
        alt="Фон"
      />
      <div className="absolute inset-0 backdrop-blur-sm bg-white/10"></div>
      
      <CodeInput />  {/* ← Вот и всё, больше ничего не трогай */}
    </div>
  )
}

export default App;