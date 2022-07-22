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

    // TODO: sorting

    // Object.keys(map).forEach((genre) => {
    //   map[genre] = map[genre].sort((a, b) => a.weight - b.weight);
    // });

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

  @Action
  async loadMovies(): Promise<Movie[]> {
    const movies = await api('shows') as Movie[];

    return movies;
  }

  @Action
  loadMovie(): Movie {
    const movie: Movie = {
      id: 1,
      genres: ['comedy', 'drama'],
      name: 'TestMovie',
      slug: 'test-1-movie',
      weight: 10,
      image: {
        medium: 'https://medium.img',
        original: 'https://large.img',
      },
    };

    return movie;
  }
}
