import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTenLatestBlocks } from '../../api';
import { Block } from '../../types'; // Importez le type Block
import { styled } from '@mui/system';

const StyledBlockContainer = styled('div')({
  border: '1px solid #ccc',
  borderRadius: '5px',
  padding: '20px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Ajouter une ombre pour le relief
});

const BlocksList: React.FC = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);

  useEffect(() => {
    const fetchBlocks = async () => {
      const latestBlocks = await getTenLatestBlocks();
      setBlocks(latestBlocks);
    };

    fetchBlocks();
  }, []);

  return (
    <StyledBlockContainer> 
      <h2>Latest Blocks</h2>
      <ul>
        {blocks.map((block) => (
          <li key={block.hash}>
            <Link to={`/block/${block.hash}`}>Block {block.header.block_number}: {block.hash.substring(0, 10)}...</Link>
          </li>
        ))}
      </ul>
    </StyledBlockContainer>
  );
};

export default BlocksList;
