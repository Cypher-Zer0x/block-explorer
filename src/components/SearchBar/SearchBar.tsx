import React, { useState } from 'react';
import { styled } from '@mui/system';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

// Utilisez styled de MUI avec Emotion pour appliquer les styles CSS
const StyledForm = styled('form')({
  marginTop: '20px',
  marginBottom: '20px',
});

const StyledInput = styled('input')({
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  width: '300px',
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
