import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MovieInterface } from '../../interfaces';
import StringHelperFunctions from '../../helpers/StringHelperFunctions';
import AxiosService from '../../services/AxiosService';
import './movie.scss';

const Movie = () => {

  const params = useParams().id;
  const [movie, setMovie] = useState<MovieInterface>({} as MovieInterface);

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const getData = () => {
    AxiosService.get<MovieInterface>(`movies/${params}`)
    .then((result: MovieInterface) => {
      Object.keys(result).forEach((key: string) => {
        const convertedKey = StringHelperFunctions.convertSnakeToCamelCase(key);
        if (convertedKey !== key) {
          result[convertedKey] = result[key];
          delete result[key];
        }
      });
      setMovie(result); 
    })
    .catch((error: Error) => console.error('Api fetching failed!'));
  }

  useEffect(() => {
    getData();
  }, []);

  return (Object.keys(movie).length > 0) ? 
  (
    <div id = "movie">
      <div id="movie-wallpaper">
        <img alt = "" src = { movie.backdropPath } />
      </div>
      <div id="movie-info">
        <div id="movie-poster">
          <img alt = "" src = { movie.posterPath } />
        </div>
        <div id="movie-details">
          <div id="movie-title">{ movie.title }</div>
          <div id="movie-synopsis">{ movie.overview }</div>
          <div id="movie-genres">
            { movie.genres.split(", ").map((genre, index) => (
                <>
                <a href = { "/?genre=" + genre }>{ genre }</a>
                <>{ (index !== movie.genres.split(", ").length - 1) ? ", " : null }</>
                </>
              )
            ) }
          </div>
          <div id="movie-popularity" className="movie-detail">
            <div className="movie-detail__name">Popularity rank</div>
            <div className="movie-detail__value">{ movie.popularity }</div>
          </div>
          { movie.budget !== 0 && 
          <div id="movie-budget" className="movie-detail">
            <div className="movie-detail__name">Budget</div>
            <div className="movie-detail__value">{ (movie.budget < 1000) ? movie.budget : (movie.budget < 1000000) ? (movie.budget/1000).toFixed(2) + "K" : (movie.budget % 1000000 === 0) ? Math.floor(movie.budget/1000000) + "M" : (movie.budget/1000000).toFixed(2) + "M" }</div>
          </div> }
          { movie.revenue !== 0 && 
          <div id="movie-revenue" className="movie-detail">
            <div className="movie-detail__name">Revenue</div>
            <div className="movie-detail__value">{ (movie.revenue < 1000) ? movie.revenue : (movie.revenue < 1000000) ? (movie.revenue/1000).toFixed(2) + "K" : (movie.revenue % 1000000 === 0) ? Math.floor(movie.revenue/1000000) + "M" : (movie.revenue/1000000).toFixed(2) + "M" }</div>
          </div> }
          <div id="movie-runtime" className="movie-detail">
            <div className="movie-detail__name">Runtime</div>
            <div className="movie-detail__value">{ (movie.runtime < 60) ? movie.runtime : Math.floor(movie.runtime/60) + "h" + movie.runtime % 60 + "min" }</div>
          </div>
          <div id="movie-year" className="movie-detail">
            <div className="movie-detail__name">Year</div>
            <div className="movie-detail__value">{ movie.releaseDate }</div>
          </div>
          <div className="movie-detail">
            <div className="movie-detail__name">Production companies</div>
            <div id="movie-companies" className="movie-detail__value">
              { movie.productionCompanies.map((companyLogo: string, index: number) =>
                companyLogo !== null && 
                  <div key = { index } className="company">
                    <img alt = "" src = { companyLogo } />
                  </div>
              ) }
            </div>
          </div>
          <div id="movie-countries" className="movie-detail">
            <div className="movie-detail__name">Production countries</div>
            <div className="movie-detail__value">
              { movie.productionCountries.split(", ").map((item: string, index: number) =>
                item 
              )}
            </div>
          </div>
      </div>
    </div>
    </div>
  )
  : <></>
}

export default Movie;
