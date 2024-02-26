import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ListItemText, Typography, List, ListItem, Divider, Container, ListItemAvatar, Avatar, Paper, Box, Link } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LinkIcon from '@mui/icons-material/Link'; // Import the link icon
import { getTenLatestBlocks } from '../../api';
import { Block } from '../../types';
import { timeSince } from '../../utils/Timestamp';

const BlocksList: React.FC = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);

  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        const latestBlocks = await getTenLatestBlocks();
        latestBlocks.sort((a, b) => parseInt(b.header.block_number) - parseInt(a.header.block_number));
        setBlocks(latestBlocks);
      } catch (error) {
        console.error("Failed to fetch latest blocks: ", error);
      }
    };

    fetchBlocks();
  }, []);


  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        ':hover': {
          boxShadow: '0px 6px 24px rgba(0, 0, 0, 0.2)',
        },
      }}>
        <Box sx={{ bgcolor: 'common.white', px: 3, py: 2 }}>
          <Typography variant="h6" color="text.primary" sx={{ fontWeight: 'bold' }}>
            Latest Blocks
          </Typography>
        </Box>
        <List disablePadding>
          {blocks.map((block, index) => (
            <React.Fragment key={block.hash}>
              <ListItem sx={{
                bgcolor: index % 2 ? 'grey.100' : 'common.white',
                ':hover': {
                  bgcolor: 'action.hover',
                },
                transition: 'background-color 0.3s',
              }}>
                <ListItemAvatar>
                  <Avatar>
                    <LinkIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="subtitle2" color="text.primary" noWrap>
                      Block {block.header.block_number}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography variant="body2" color="text.secondary" noWrap sx={{ display: 'flex', alignItems: 'center' }}>
                        <AccessTimeIcon sx={{ fontSize: '1rem', mr: 1 }} />
                        {timeSince(block.header.timestamp)}
                      </Typography>
                      <Link component={RouterLink} to={`/block/${block.hash}`} color="primary" sx={{
                        ':hover': {
                          color: 'secondary.main',
                        },
                        display: 'block', // Ensure the link takes the full width for hover effect
                      }}>
                        {block.hash.substring(0, 50)}...
                      </Link>
                    </>
                  }
                />
              </ListItem>
              {index < blocks.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default BlocksList;