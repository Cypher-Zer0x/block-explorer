import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UtxoDetailsPage : React.FC = () => {
  const { utxoId } = useParams();
  const [utxoDetails, setUtxoDetails] = useState(null);

  useEffect(() => {
    const fetchUtxoDetails = async () => {
    };

    fetchUtxoDetails();
  }, [utxoId]);

  return (
    <div>
      <h1>UTXO Details</h1>
      <p>UTXO ID: {utxoId}</p>
    </div>
  );

};

export default UtxoDetailsPage;
