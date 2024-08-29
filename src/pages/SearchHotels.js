import React, { useState } from 'react';
import { TextField, Button, Slider, Container, Typography } from '@mui/material';
import CustomInput from '../components/CustomInput';
import HotelCard from '../components/HotelCard';
import LoadingSpinner from '../components/LoadingSpinner'; 
import axios from 'axios';

function SearchHotels() {
  const [city, setCity] = useState('');
  const [starRating, setStarRating] = useState(3);
  const [facilities, setFacilities] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [errors, setErrors] = useState({});
  const [searched, setSearched] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!city) newErrors.city = 'City is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
    };

  const searchHotelsFunc = async () => {
    if (!validate()) return;

    setLoading(true); 
    setSearched(true);
    try {
      const response = await axios.post('https://intelli-travel-backend-6ee1ae1a7246.herokuapp.com/search', {
        city,
        star_rating: starRating,
        feature: facilities
      });
      setResults(response.data);
    } catch (error) {
      console.error('Error searching hotels:', error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <Container>
      <Typography variant="h4" className="page-header">
        Search Hotels by City, Star Rating, and Feature
      </Typography>
      <div id="search-section">
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
        <Typography gutterBottom>Minimum Star Rating</Typography>
        <Slider
          value={starRating}
          onChange={(e, newValue) => setStarRating(newValue)}
          min={1}
          max={5}
          step={1}
          marks
          valueLabelDisplay="auto"
        />
        <CustomInput
          label="Facilities (comma-separated)"
          value={facilities}
          onChange={(e) => setFacilities(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={searchHotelsFunc}>
          Search Hotels
        </Button>
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : (
      searched && results.length === 0 ? (
        <Typography variant="h6" align="center" style={{ marginTop: '20px', color: '#FF6F61' }}>
          No hotels found in the database.
        </Typography>
      ) :
      (
        results.length > 0 && (
          <div className="card-container">
            {results.map((hotel, index) => (
              <HotelCard key={index} hotel={hotel} />
            ))}
          </div>
        )
      )
    )}
    </Container>
  );
}

export default SearchHotels;
