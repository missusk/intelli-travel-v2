import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import HotelCard from '../components/HotelCard';
import LoadingSpinner from '../components/LoadingSpinner';
import axios from 'axios';

function FindSimilarHotels() {
  const [hotelName, setHotelName] = useState('');
  const [city, setCity] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [searched, setSearched] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!hotelName) newErrors.hotelName = 'Hotel Name is required';
    if (!city) newErrors.city = 'City is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const recommendHotels = async () => {
    if (!validate()) return;

    setLoading(true);
    setSearched(true);
    try {
      const response = await axios.post('http://localhost:5000/recommend', {
        hotel_name: hotelName,
        target_city: city
      });
      setResults(response.data);
    } catch (error) {
      console.error('Error recommending hotels:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Typography variant="h4" className="page-header">
        Find Similar Hotels
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
        <Button variant="contained" color="primary" onClick={recommendHotels}>
          Find Similar Hotels
        </Button>
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : searched && results.length === 0 ? (
        <Typography variant="h6" align="center" style={{ marginTop: '20px', color: '#FF6F61' }}>
          No hotels found in the database.
        </Typography>
      ) : (
        results.length > 0 && (
          <div className="card-container">
            {results.map((hotel, index) => (
              <HotelCard key={index} hotel={hotel} />
            ))}
          </div>
        )
      )}
    </Container>
  );
}

export default FindSimilarHotels;
