import React, { useState } from 'react';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { getUTXODetails, getBlockDetails, getTransactionDetails } from '../../api';
import Box from '@mui/material/Box';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const StyledForm = styled('form')({
  marginTop: '20px',
  marginBottom: '20px',
  display: 'flex',
  alignItems: 'center', // Pour aligner l'input et le bouton sur la même ligne
  flexDirection: 'row', // S'assure que le layout est horizontal
});

const StyledInput = styled('input')({
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  width: '300px',
  marginRight: '10px',
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

const ErrorMessage = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(1),
  margin: theme.spacing(1, 0),
  backgroundColor: 'rgba(255, 0, 0, 0.1)', // Fond légèrement rouge pour l'accentuation
  border: '1px solid red', // Bordure rouge
  borderRadius: theme.shape.borderRadius, // Utilise le borderRadius par défaut de MUI
}));


const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setErrorMessage(''); // Réinitialise le message d'erreur à chaque soumission
    let path = '';

    if (await getBlockDetails(searchTerm)) {
      path = `/block/${searchTerm}`;
    } else if (await getTransactionDetails(searchTerm)) {
      path = `/transaction/${searchTerm}`;
    } else if (await getUTXODetails(searchTerm)) {
      path = `/utxoDetails/${searchTerm}`;
    }

    if (path) {
      navigate(path);
    } else {
      // Met à jour le message d'erreur si aucune correspondance n'est trouvée
      setErrorMessage('No resource found for this hash');
    }
  };

  return (
    <div>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput
          type="text"
          placeholder="Search for blocks, transactions, or UTXO"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <StyledButton type="submit">Search</StyledButton>
      </StyledForm>
      {errorMessage && (
        <ErrorMessage>
          <WarningAmberIcon sx={{ marginRight: 1, color: 'red' }} />
          {errorMessage}
        </ErrorMessage>
      )}
    </div>
    
  );
};

export default SearchBar;
