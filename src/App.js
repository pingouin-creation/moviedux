import './App.css';
import './styles.css';
import Header from './components/Header';
import Footer from './components/Footer';
import MoviesGrid from './components/MoviesGrid';
import WatchList from './components/WatchList';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
 
function App() {
	const [movies, setMovies] = useState([]);

	const [watchlist, setwatchlist] = useState([])

	useEffect(() => {
		fetch('movies.json')
			.then((response) => response.json())
			.then((data) => setMovies(data));
	}, []);

	const toggleWatchlist = (movieId) => { 
		setwatchlist((prev) => 
			 prev.includes(movieId)? prev.filter((id) => id !== movieId) : [...prev, movieId]
		)
	}

  return (
    <div className="App">
		  <div className='container'>
			  <Header />
			  <Router>
				  <nav>
					  <ul>
						  <li>
							  <Link to='/'>Home</Link>
						  </li>
						   <li>
							  <Link to='/watchlist'>Watchlist</Link>
						  </li>
					  </ul>
				  </nav>
				  <Routes>
					  <Route path='/' element={<MoviesGrid watchlist={watchlist} movies={movies} toggleWatchlist={toggleWatchlist} />} />
					  <Route path='/watchlist' element={<WatchList watchlist={watchlist} movies={movies} toggleWatchlist={toggleWatchlist} />} />
				  </Routes>
			  </Router>
		  </div>
		  <Footer />
    </div>
  );
}


export default App;
