import {
  VuexModule, Module, Mutation, Action,
} from 'vuex-module-decorators';

import type Movie from '@/types/Movie';

@Module({ namespaced: true, name: 'movies' })
export default class Movies extends VuexModule {
  movies: Movie[] = [];

  movie: Movie | null = null;

  @Mutation
  setMovie(movie: Movie) {
    this.movie = movie;
  }

  @Action
  getMovie(): Movie {
    const movie: Movie = {
      name: 'TestMovie',
    };

    return movie;
  }
}
