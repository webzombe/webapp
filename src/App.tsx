import './App.css'
import Jopa from "./assets/jopa.png"; 
import { CodeInput } from './components/CodeInput';

function App() {


  return (
    <>
      <div className="w-screen h-screen relative overflow-hidden">
        <img
          src={Jopa} // Теперь используем импортированный модуль
          className="absolute inset-0 w-full h-full object-fill"
          alt="Фон"
        />
        <div className="absolute inset-0 backdrop-blur-sm bg-white/10"></div>
        {CodeInput()}
      </div>
    </>
  )
}

export default App
