import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import Home from './pages/Home';
import FindSimilarHotels from './pages/FindSimilarHotels';
import SearchHotels from './pages/SearchHotels';
import CheckAttractions from './pages/CheckAttractions';

function App() {
  return (
    <Router>
      <div className="app-container">
        <AppBar position="static" id="navbar">
          <Toolbar>
            <Typography variant="h6" className="logo">
              Intelli-Travel
            </Typography>
            <div className="nav-links">
              <Button color="inherit" component={Link} to="/intelli-travel-v2">Home</Button>
              <Button color="inherit" component={Link} to="/find-similar-hotels">Find Similar Hotels</Button>
              <Button color="inherit" component={Link} to="/search-hotels">Search Hotels</Button>
              <Button color="inherit" component={Link} to="/check-attractions">Check Attractions</Button>
            </div>
          </Toolbar>
        </AppBar>

        {/* Main content section */}
        <div className="content-wrap">
          <Container>
            <Routes>
              <Route path="/intelli-travel-v2" element={<Home />} />
              <Route path="/find-similar-hotels" element={<FindSimilarHotels />} />
              <Route path="/search-hotels" element={<SearchHotels />} />
              <Route path="/check-attractions" element={<CheckAttractions />} />
            </Routes>
          </Container>
        </div>

        {/* Footer */}
        <footer className="footer">
          <p>Made by Maria Khan</p>
          <p>
            <a href="https://www.github.com/missusk" target="_blank" rel="noopener noreferrer">GitHub</a> | 
            <a href="https://www.linkedin.com/in/khan-maria-" target="_blank" rel="noopener noreferrer"> LinkedIn</a> | 
            <a href="mailto:memaria210@gmail.com"> Email</a>
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
