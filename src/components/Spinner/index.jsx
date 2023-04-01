import { Box, CircularProgress } from '@mui/material';
import React from 'react';

const Spinner = () => {
  return (
    <Box
      sx={{
        height: '95vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <CircularProgress
        sx={{
          margin: '0',
        }}
        size={400}
      />
    </Box>
  );
};

export default Spinner;
