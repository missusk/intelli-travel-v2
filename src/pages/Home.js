import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, Button, Collapse, colors, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [expanded, setExpanded] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`https://api.unsplash.com/photos/random`, {
          params: {
            query: 'travel',
            count: 5,
            orientation: 'landscape',
          },
          headers: {
            Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`,
          },
        });
        setImageUrls(response.data.map((image) => image.urls.regular));
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000000); // Change every 300 seconds

    return () => clearInterval(interval);
  }, [imageUrls]);

  useEffect(() => {
    const images = document.querySelectorAll('.slideshow-image');
    images.forEach((img, index) => {
      img.classList.remove('active');
      if (index === currentImageIndex) {
        img.classList.add('active');
      }
    });
  }, [currentImageIndex]);

  const handleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <div className="home-container">
      <div className="slideshow-container">
        {imageUrls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt="Travel"
            className={`slideshow-image ${index === 0 ? 'active' : ''}`}
          />
        ))}
      </div>

      <div className="blurred-container">
        <Container>
          {/* Hero Section */}
          <div className="blurred-container">
            <Typography variant="h4" className="hero-title">
              Discover Your Perfect Stay
            </Typography>
            <Typography variant="h5" className="hero-quote">
              "Travel far, travel wide, find the perfect place to reside."
            </Typography>
          </div>

          {/* Feature Highlights with Expandable Details */}
          <Grid container spacing={4} className="feature-section">
            <Grid item xs={12} md={4}>
              <Card className="feature-card" onClick={() => handleExpand(0)}>
                <CardContent>
                  <Typography variant="h5" className="feature-title">
                    Find Similar Hotels
                  </Typography>
                  <Typography variant="body2">
                    Easily find hotels similar to your preferred choice.
                  </Typography>
                  <Collapse in={expanded === 0}>
                    <div className="feature-details">
                      <Typography variant="body2">
                        Our "Find Similar Hotels" feature uses advanced algorithms to suggest hotels with similar amenities, ratings, and locations to your top picks. Whether you're looking for a luxurious stay or a budget-friendly option, this tool ensures you have the best alternatives at your fingertips.
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        className="get-started-btn"
                        component={Link}
                        to="/find-similar-hotels"
                      >
                        Get Started
                      </Button>
                    </div>
                  </Collapse>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card className="feature-card" onClick={() => handleExpand(1)}>
                <CardContent>
                  <Typography variant="h6" className="feature-title">
                    Search Hotels
                  </Typography>
                  <Typography variant="body2">
                    Search hotels by city, star rating, and more.
                  </Typography>
                  <Collapse in={expanded === 1}>
                    <div className="feature-details">
                      <Typography variant="body2">
                        Use the "Search Hotels" feature to filter hotels by city, star ratings, facilities, and more. This tool helps you find the best accommodations based on your specific needs and preferences, ensuring a perfect stay every time.
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        className="get-started-btn"
                        component={Link}
                        to="/search-hotels"
                      >
                        Get Started
                      </Button>
                    </div>
                  </Collapse>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card className="feature-card" onClick={() => handleExpand(2)}>
                <CardContent>
                  <Typography variant="h6" className="feature-title">
                    Check Attractions
                  </Typography>
                  <Typography variant="body2">
                    Explore nearby attractions around your selected hotels.
                  </Typography>
                  <Collapse in={expanded === 2}>
                    <div className="feature-details">
                      <Typography variant="body2">
                        "Check Attractions" helps you discover the top attractions near your chosen hotels. Whether you're interested in historical sites, shopping, dining, or entertainment, this feature provides detailed insights into what's around, making your trip planning easier.
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        className="get-started-btn"
                        component={Link}
                        to="/check-attractions"
                      >
                        Get Started
                      </Button>
                    </div>
                  </Collapse>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

<Box className="metrics-section" textAlign="center" mt={5}>
            <Typography variant="h4" gutterBottom>
              Our Database
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} md={4}>
                <Card className="metric-card">
                  <CardContent>
                    <Typography variant="h5" className="metric-title">
                      10,000+
                    </Typography>
                    <Typography variant="body2" className="metric-subtitle">
                      Indian Hotels
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card className="metric-card">
                  <CardContent>
                    <Typography variant="h5" className="metric-title">
                      500+
                    </Typography>
                    <Typography variant="body2" className="metric-subtitle">
                      Cities Covered
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card className="metric-card">
                  <CardContent>
                    <Typography variant="h5" className="metric-title">
                      5+
                    </Typography>
                    <Typography variant="body2" className="metric-subtitle">
                      Years of Data
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>

        </Container>
      </div>
    </div>
  );
}

export default Home;
