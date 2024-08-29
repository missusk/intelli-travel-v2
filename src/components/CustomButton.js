import React from 'react';
import { Button } from '@mui/material';

function CustomButton({ onClick, children }) {
  return (
    <Button
      variant="contained"
      color="primary"
      fullWidth
      style={{ backgroundColor: '#ff4081', color: 'white' }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export default CustomButton;
