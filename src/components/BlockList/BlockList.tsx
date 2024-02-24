// src/components/BlocksList/BlocksList.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getLatestBlocks } from '../../api';
import { Block } from '../../types'; // Importez le type Block

const BlocksList: React.FC = () => {
  // Définissez l'état avec le type Block[]
  const [blocks, setBlocks] = useState<Block[]>([]);

  useEffect(() => {
    const fetchBlocks = async () => {
      const latestBlocks = await getLatestBlocks();
      setBlocks(latestBlocks);
    };

    fetchBlocks();
  }, []);

  return (
    <div>
      <h2>Latest Blocks</h2>
      <ul>
        {blocks.map((block) => (
          <li key={block.hash}>
            <Link to={`/block/${block.hash}`}>Block {block.number}: {block.hash.substring(0, 10)}...</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlocksList;
