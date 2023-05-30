export default interface MovieInterface {
    [key: string]: any;
    id: number;
    title: string;
    revenue: number;
    runtime: number;
    tagline: string;
    budget: number;
    overview: string;
    genres: string;
    popularity: number;
    movieId: number;
    backdropPath: string;
    productionCompanies: string[];
    productionCountries: string;
    originalLanguage: string;
    originalTitle: string;
    releaseDate: number;
    voteAverage: number;
    posterPath: string;
}
