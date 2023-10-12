import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/Reviews/Reviews';

function App() {
  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);

  const getMovies = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/movies")
      setMovies(response.data);
    } catch(err) {
      console.error(err);
    }
  }

  const getMovieData = async (movieId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/movies/${movieId}`)
      setMovie(response.data)
      setReviews(response.data.reviews);
    } catch(error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className='App'>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home movies={movies}/>}></Route>
          <Route path='/trailer/:ytTrailerId' element={<Trailer />}></Route>
          <Route path="/reviews/:movieId" element={<Reviews getMovieData={getMovieData} movie={movie} reviews={reviews} setReviews={setReviews} />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
