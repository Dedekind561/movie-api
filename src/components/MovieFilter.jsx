// import React, { useState, useEffect } from 'react';

// const MovieFilter = ({ genres, onFilterChange }) => {
//   const [selectedGenres, setSelectedGenres] = useState([]);

//   const handleGenreChange = (event) => {
//     const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
//     setSelectedGenres(selectedOptions);
//     onFilterChange(selectedOptions); // Pass selected genres to parent component
//   };

//   return (
//     <div className="movie-filter">
//       <h4>Genre Filter</h4>
//       <select multiple onChange={handleGenreChange} value={selectedGenres}>
//         {genres.map(genre => (
//           <option key={genre.id} value={genre.id}>{genre.name}</option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default MovieFilter;