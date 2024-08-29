import React from 'react';
import { TextField } from '@mui/material';

function CustomInput({ label, value, onChange }) {
  return (
    <TextField
      fullWidth
      label={label}
      value={value}
      onChange={onChange}
      margin="normal"
      variant="outlined"
      InputProps={{ style: { color: 'white' } }}
      InputLabelProps={{ style: { color: '#ff4081' } }}
    />
  );
}

export default CustomInput;
