import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';

import LoadingSpinner from '../components/LoadingSpinner'; 
import axios from 'axios';

function CheckAttractions() {
  const [hotelName, setHotelName] = useState('');
  const [city, setCity] = useState('');
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [errors, setErrors] = useState({});
  const [searched, setSearched] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!city) newErrors.city = 'City is required';
    if (!hotelName) newErrors.hotelName = 'Hotel Name is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const findAttractions = async () => {
    if (!validate()) return;

    setLoading(true); 
    setSearched(true);
    try {
      const response = await axios.post('http://localhost:5000/attractions', {
        hotel_name: hotelName,
        city
      });
      setAttractions(response.data);
    } catch (error) {
      console.error('Error finding attractions:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Typography variant="h4" className="page-header">
        Check Out Attractions
      </Typography>
      <div id="search-section">
        <TextField
          fullWidth
          label="Hotel Name"
          value={hotelName}
          onChange={(e) => setHotelName(e.target.value)}
          margin="normal"
          required
          error={!!errors.hotelName}
          helperText={errors.hotelName}
        />
        <TextField
          fullWidth
          label="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          margin="normal"
          required
          error={!!errors.city}
          helperText={errors.city}
        />
        <Button variant="contained" color="primary" onClick={findAttractions}>
          Find Attractions
        </Button>
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        searched && attractions.length === 0 ? (
            <Typography variant="h6" align="center" style={{ marginTop: '20px', color: '#FF6F61' }}>
          No attractions found in the database.
            </Typography>
            ) :
        attractions.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <ul>
              {attractions.map((attraction, index) => (
                <li key={index}>{attraction}</li>
              ))}
            </ul>
          </div>
        )
      )}
    </Container>
  );
}

export default CheckAttractions;
