import React, { useState } from 'react';
import '../styles.css';
import MovieCard from './MovieCard';

export default function MoviesGrid({movies, watchlist, toggleWatchlist}) {

	const [searchTerm, setSearchTerm] = useState(''); 
	
	const handleSearchChange = e => {
		setSearchTerm(e.target.value);
	}

	const handleGenreChange = e => {
		setGenre(e.target.value);
	}


		const handleRatingChange = e => {
		setRating(e.target.value);
	}


	const [genre, setGenre] = useState('All genres'); 
	const [rating, setRating] = useState('All'); 


	const matchesGenre = (movie, genre) => {
		return genre === 'All genres' || movie.genre.toLowerCase() === genre.toLowerCase();
	}

	const matchesSearchTerm = (movie, searchTerm) => {
		return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
	}

	const matchesRating = (movie, rating) => {
		switch (rating) {
			case 'Good':
				return movie.rating >= 8;
			case 'Ok':
				return movie.rating >= 5 && movie.rating < 8;
			case 'Bad':
				return movie.rating < 5;
			default:
				return true;
		}
	}

	const filteredMovies = movies.filter((movie => matchesGenre(movie, genre) && matchesRating(movie, rating) && matchesSearchTerm(movie, searchTerm) ));


	return (
		<div>
			<input value={searchTerm} onChange={handleSearchChange} className='search-input' type='text' placeholder='Search movies ...' />
			<div className='filter-bar'>
				<div className='filter-slot'>
					<label>Genre</label>
					<select onChange={ handleGenreChange} className='filter-dropdown' value={genre}>
						<option>All genres</option>
						<option>Action</option>
						<option>Drama</option>
						<option>Fantasy</option>
						<option>Horror</option>
					</select>
				</div>
				<div className='filter-slot'>
					<label>Rating</label>
					<select onChange={ handleRatingChange} className='filter-dropdown' value={rating}>
						<option>All</option>
						<option>Good</option>
						<option>Ok</option>
						<option>Bad</option>
					</select>
				</div>
			</div>
		<div className='movies-grid'>
			{filteredMovies.map((movie) => (
				<MovieCard movie={movie} key={movie.id} toggleWatchlist={toggleWatchlist}  isWatchListed={watchlist.includes(movie.id)} />
			))}
			</div>
			</div>
	);
}
