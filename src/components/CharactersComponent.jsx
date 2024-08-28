import React, { useState, useEffect } from 'react';
import CharacterDetails from '../CharacterDetails';
import Spinner from '../Spinner'; // Import a Spinner component

const CharactersComponent = () => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ gender: '', alive: '', species: '', house: '' });
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://hp-api.onrender.com/api/characters');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setCharacters(data);
      setFilteredCharacters(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    filterCharacters(e.target.value, filters);
  };

  const handleFilterChange = (e) => {
    const newFilters = { ...filters, [e.target.name]: e.target.value };
    setFilters(newFilters);
    filterCharacters(searchTerm, newFilters);
  };

  const filterCharacters = (searchTerm, filters) => {
    let filtered = characters.filter(character => 
      character.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filters.gender ? character.gender === filters.gender : true) &&
      (filters.alive ? character.alive === (filters.alive === 'true'): true) &&
      (filters.species ? character.species === filters.species : true) &&
      (filters.house ? character.house === filters.house : true)
    );
    setFilteredCharacters(filtered);
  };

  const handleFavouriteToggle = (character) => {
    setFavourites(prevFavourites => {
      const isFavourite = prevFavourites.some(fav => fav.name === character.name);
      if (isFavourite) {
        return prevFavourites.filter(fav => fav.name !== character.name);
      } else {
        return [...prevFavourites, character];
      }
    });
  };

  const isFavourite = (character) => {
    return favourites.some(fav => fav.name === character.name);
  };

  if (loading) {
    return <Spinner />; // Display the spinner while loading
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>; // Display error message
  }

  return (
    <div>
      <input 
        type="text" 
        placeholder="Search by name" 
        value={searchTerm} 
        onChange={handleSearch} 
      />
      <div>
        <label>
          Gender:
          <select name="gender" onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        
        <label>
          Species:
          <select name="species" onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="human">Human</option>
            <option value="half-giant">Half-giant</option>
            <option value="werewolf">Werewolf</option>
            <option value="cat">Cat</option>
            <option value="snake">Snake</option>
            <option value="phoniex">Phoniex</option>
            <option value="dog">Dog</option>
            <option value="goblin">Goblin</option>
            <option value="owl">Owl</option>
            <option value="toad">Toad</option>
            <option value="giant">Giant</option>
            <option value="ghost">Ghost</option>
            <option value="poltergeist">Poltergeist</option>
            <option value="dragon">Dragon</option>
            <option value="centaur">Centaur</option>
            <option value="house-elf">House-elf</option>
          </select>
        </label>
        
        <label>
          House:
          <select name="house" onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="Gryffindor">Gryffindor</option>
            <option value="Slytherin">Slytherin</option>
            <option value="Hufflepuff">Hufflepuff</option>
            <option value="Ravenclaw">Ravenclaw</option>
          </select>
        </label>


      </div>
      <div className="character-list">
        {filteredCharacters.slice(0, 6).map(character => (
          <div 
            className="character-container" 
            key={character.name} 
            onClick={() => setSelectedCharacter(character)}
          >
            <img id="pic" src={character.image} alt={character.name} />
            <h3>{character.name}</h3>
            <p>DOB: {character.dateOfBirth}</p>
            <p>Species: {character.species}</p>
            <p>House: {character.house}</p>
            <button onClick={() => handleFavouriteToggle(character)}>
              {isFavourite(character) ? 'Unfavourite' : 'Favourite'}
            </button>
          </div>
        ))}
      </div>

      <h2>Favourites</h2>
      <div className="character-list">
        {favourites.map(character => (
          <div 
            className="character-container" 
            key={character.name} 
            onClick={() => setSelectedCharacter(character)}
          >
            <img id="pic" src={character.image} alt={character.name} />
            <h3>{character.name}</h3>
            <p>DOB: {character.dateOfBirth}</p>
            <p>Species: {character.species}</p>
            <p>House: {character.house}</p>
          </div>
        ))}
      </div>

      {selectedCharacter && (
        <CharacterDetails 
          character={selectedCharacter} 
          onBack={() => setSelectedCharacter(null)} 
        />
      )}
    </div>
  );
};

export default CharactersComponent;
