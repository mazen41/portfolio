import AnimatedRoutes from './AnimatedRoutes';
import MazWidget from './components/assistant/MazWidget';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
      <MazWidget />
    </BrowserRouter>
  );
}

export default App;
