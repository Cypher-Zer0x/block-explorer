import React, { useState } from 'react';
import { styled } from '@mui/system';
import { getUTXODetails, getBlockDetails, getTransactionDetails } from '../../api';
import { useNavigate } from 'react-router-dom'; // Importez useNavigate

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
  backgroundColor: '#6F4CFF',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#0056b3',
  },
});

const SearchBar: React.FC<SearchBarProps> = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Utilisez useNavigate pour la navigation

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let path = ''; // Initialiser le chemin de redirection

    // Appels asynchrones pour vérifier le type de ressource
    if (await getBlockDetails(searchTerm)) {
      path = `/block/${searchTerm}`;
    } else if (await getTransactionDetails(searchTerm)) {
      path = `/transaction/${searchTerm}`;
    } else if (await getUTXODetails(searchTerm)) {
      path = `/utxoDetails/${searchTerm}`;
    }

    if (path) {
      navigate(path); // Naviguer vers le chemin si trouvé
    } else {
      // Gérer le cas où aucune ressource n'est trouvée
      console.log('No resource found for this hash'); // Ou afficher une notification à l'utilisateur
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledInput
        type="text"
        placeholder="Search for blocks, transactions, or UTXO"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <StyledButton type="submit">Search</StyledButton>
    </StyledForm>
  );
};

export default SearchBar;
