import {
  VuexModule, Module, Mutation, Action,
} from 'vuex-module-decorators';

import api from '@/api';
import type Movie from '@/types/Movie';

@Module({ namespaced: true, name: 'movies' })
export default class Movies extends VuexModule {
  movies: Movie[] = [];

  movie: Movie | null = null;

  get getGenresMovies(): Record<string, Array<Movie>> {
    const map = {};

    this.movies.forEach((movie) => {
      movie.genres.forEach((genre) => {
        if (!map[genre]) map[genre] = [];

        map[genre].push(movie);
      });
    });

    Object.keys(map).forEach((genre) => {
      map[genre] = map[genre].sort((a, b) => b.weight - a.weight);
    });

    return map;
  }

  get getGenres(): string[] {
    const genres = [];

    Object.keys(this.getGenresMovies).forEach((genre) => {
      genres.push(genre);
    });

    return genres;
  }

  @Mutation
  setMovies(movies: Movie[]) {
    this.movies = movies;
  }

  @Mutation
  setMovie(movie: Movie) {
    this.movie = movie;
  }

  @Action({ rawError: true })
  async loadMovies(): Promise<Movie[]> {
    const movies = await api('shows') as Movie[];

    return movies;
  }

  @Action({ rawError: true })
  async loadMovie(id: number): Promise<Movie> {
    const movie = await api(`shows/${id}`) as Movie;

    return movie;
  }
}
