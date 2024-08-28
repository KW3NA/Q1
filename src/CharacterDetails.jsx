import React from 'react';

const CharacterDetails = ({ character, onBack }) => {
  return (
    <div className="character-details">
      
      <img src={character.image} alt={character.name} />
      <h2>{character.name}</h2>
      <p>Alternate Names: {character.alternate_names.join(', ')}</p>
      <p>DOB: {character.dateOfBirth}</p>
      <p>Species: {character.species}</p>
      <p>Gender: {character.gender}</p>
      <p>Eye colour: {character.eyeColour}</p>
      <p>House: {character.house}</p>
      <p>Actor: {character.actor}</p>
      <button onClick={onBack}>Clear</button>
    </div>
  );
};

export default CharacterDetails;
