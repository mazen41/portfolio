import AnimatedRoutes from './AnimatedRoutes';
import MazWidget from './components/assistant/MazWidget';
import { MazIntroProvider } from './components/intro/MazIntro';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <MazIntroProvider>
        <AnimatedRoutes />
        <MazWidget />
      </MazIntroProvider>
    </BrowserRouter>
  );
}

export default App;
