import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const limit = 15;

function App() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=> {
    fetchCharacters(2);
  }, []);
  
  const fetchCharacters = async (page) => {
    setIsLoading(true);
    const apiUrl = 'http://localhost:80/character';
    const result = await axios.get(apiUrl, {params: {page, limit}});
    setCharacters(result.data.characters);
    setIsLoading(false);
  };
  const handlePrev = async () => {
    const prevPage = page - 1;
    await fetchCharacters(prevPage);
    setPage(prevPage);
  }
  const handleNext = async () => {
    const nextPage = page + 1;
    await fetchCharacters(nextPage);
    setPage(nextPage);
  }

  return (
    <div className="container">
      <div className='header'>
        <div className='header-content'>
          <img src='logo.png' alt='logo' className='logo' />
        </div>
      </div>
      {isLoading ? <div>Now Loading...</div> :
      <main>
        <div  className='cards-container'>
          {characters.map((character) => {
            return <div className='card' key={character.id}>
              <img src={character.images[0] ?? 'dummy.png'} alt="character" className='card-image'  />
              <div className='card-containt'>
                <h3 className='card-title'>{character.name}</h3>
                <p className='card-discrption'>{character.debut?.appearsIn ?? 'なし'}</p>
                <div className='card-footer'>
                  <span className='affiliation'>{character.personal?.affiliation ?? 'なし'}</span>
                </div>
              </div>
            </div>
          })}
        </div>
        <div className='pager'>
          <button className='prev' disabled={page === 1} onClick={handlePrev}>Previous</button>
          <span className='page-number'>{page}</span>
          <button className='next' disabled={ limit > characters.length } onClick={handleNext}>Next</button>
        </div>
      </main>
      }
    </div>
  );
}

export default App;
