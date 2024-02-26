import React from 'react';
import { Box, Link, Typography } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'rgba(18, 18, 18, 0.2)',
        textAlign: 'center',
        padding: '20px 0px 20px 0px',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '10px',
        }}
      >
        <Link href="https://twitter.com/cypher_lab" target="_blank" color="inherit">
          <TwitterIcon
            sx={{
              margin: '0 15px',
              color: 'white',
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            }}
          />
        </Link>
        <Link href="https://fr.linkedin.com/company/cypher-lab" target="_blank" color="inherit">
          <LinkedInIcon
            sx={{
              margin: '0 15px',
              color: 'white',
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            }}
          />
        </Link>
        <Link href="https://github.com/Cypher-Zer0x" target="_blank" color="inherit">
          <GitHubIcon
            sx={{
              margin: '0 15px',
              color: 'white',
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            }}
          />
        </Link>
      </Box>

      <Typography
        variant="body2"
        color="textSecondary"
        component="p"
        sx={{ color: 'white', fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' } }}
      >
        © 2024 Cypher Zer0x by Cypher Lab. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;