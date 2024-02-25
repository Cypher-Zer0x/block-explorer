import React, { useState } from 'react';
import { styled } from '@mui/system';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

// Utilisez styled de MUI avec Emotion pour appliquer les styles CSS
const StyledForm = styled('form')({
  marginTop: '20px',
  marginBottom: '20px',
  display: 'flex', // Utilisez flexbox pour aligner les éléments horizontalement
});

const StyledInput = styled('input')({
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  width: '300px',
  marginRight: '10px', // Ajoutez une marge à droite pour créer un espace entre le champ et le bouton
});

const StyledButton = styled('button')({
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#0056b3',
  },
});

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledInput
        type="text"
        placeholder="Search for blocks, transactions, or addresses"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <StyledButton type="submit">Search</StyledButton>
    </StyledForm>
  );
};

export default SearchBar;
