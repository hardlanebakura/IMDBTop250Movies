import React, { useState, useEffect, ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import AxiosService from '../../services/AxiosService';
import { TopMoviesPageInterface, GenreInterface } from '../../interfaces';
import ObjectHelperFunctions from '../../helpers/ObjectHelperFunctions';
import StringHelperFunctions from '../../helpers/StringHelperFunctions';
import './top-movies.scss';
import star from '../../assets/images/star.jpg';

const TopMovies = ({randomGenre, genres}: TopMoviesPageInterface) => {

  const genreNames: string[] = genres.map((genre: GenreInterface) => genre.name);

  const [params] = useSearchParams();

  var [randomGenre, setRandomGenre] = useState<string>(params.get("genre") ?? randomGenre);
  var [moviesInRandomGenre, setMoviesInRandomGenre] = useState([]);

  const addSelectedOptionRandomGenre = (e?: ChangeEvent<HTMLSelectElement>) => {
    if (e !== undefined) {
      setRandomGenre(e.target.value);
    }
  }

  const getMoviesForChosenGenre = () => {
    AxiosService.post('movies', randomGenre)
    .then((result: any) => setMoviesInRandomGenre(result.splice(0, 20)))
    .catch(error => console.error('Api fetching failed!'));
  }

  const getRows = () => {
    const movieRows = ObjectHelperFunctions.splitArrayToChunks(moviesInRandomGenre, 3);
    const getRow = (row: any) => {
      return row.map((item: any) => {
        return (
          <div className="wrapper">
            <div className="movie">
              <a href = { `/movies/${item.id}` } >
                <div className="image-zoom">
                  <img alt = '' src = { item.poster_path } />
                </div>
                <div className="movie-title">{ item.title }</div>
                <div className="movie-rating">
                  <img alt = '' src = { star } />
                  <div className="movie-rating__votes">{ item.vote_average }</div>
                </div>
                <div className="movie-date">{ item.release_date }</div>
              </a>  
            </div>
          </div>
        )
      })
    }
    return movieRows.map((row, index) =>
        <div className="movie-row" key = { index } >
          { getRow(row) }
        </div>
    )
  }

  useEffect(() => {
    addSelectedOptionRandomGenre();
    getMoviesForChosenGenre();
  }, [randomGenre]);

  return (
    <div id="genres">
      <div id="categories-selection">
        <div>Select a genre:</div>
        <select id = "categories" name = "categories" onChange = { addSelectedOptionRandomGenre } value = { randomGenre } >
          { genreNames.map(
            (genre, index) =>
              <option key = { index } value = { genre }>{ genre }</option>
            )
          }
        </select>
      </div>
      <div className="movies-rows">
        { getRows() }
      </div>
    </div>
  )
}

export default TopMovies;
