import './App.css';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  useEffect(()=> {
    fetchCharacters();
  }, []);
  
  const fetchCharacters = async () => {
    const apiUrl = 'http://localhost:80/character';

    const result = await axios.get(apiUrl);
    console.log(result);
  };
  return (
    <div className="App">hello world
    </div>
  );
}

export default App;
