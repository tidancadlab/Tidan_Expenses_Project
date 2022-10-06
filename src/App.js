import { BrowserRouter } from 'react-router-dom';
import './App.css';
import HomePage from './component/Pages/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    </div>
  );
}

export default App;
