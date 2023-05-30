import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import './index.scss';
import { Navbar, TopMovies, Movie } from './components';
import Footer from './pages/footer/Footer';
import './App.scss';
import AxiosService from './services/AxiosService';
import GenreInterface from './interfaces/GenreInterface';

function App() {
  
  const [randomGenre, setRandomGenre] = useState('');
  const [genres, setGenres] = useState<GenreInterface[]>([]);

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const getData = () => {
    AxiosService.get<GenreInterface[]>('genres')
    .then((genres: GenreInterface[]) => {
      setGenres(genres); 
      setRandomGenre(genres[Math.floor(Math.random() * genres.length)].name); 
    })
    .catch((error: Error) => console.error('Api fetching failed!'));
  }

  useEffect(() => {
    getData();
  }, []);

  return (genres && genres.length > 0 && randomGenre !== '') ? (
    <Router>
      <Routes>
        <Route path = "/" element = {<Layout />} >
          <Route path = "/" element = {<TopMovies randomGenre = { randomGenre } genres = { genres } />} />
          <Route path = "/movies/:id" element = {<Movie />} />
        </Route>
      </Routes>
    </Router>
  ) : <></>
}

function Layout () {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default App;