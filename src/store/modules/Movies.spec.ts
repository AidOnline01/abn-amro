import { createStore } from 'vuex';
import type { Store } from 'vuex';
import type { State } from '@/store';
import Movies from '@/store/modules/Movies';
import { getModule } from 'vuex-module-decorators';
import baseMovie from '@/tests/baseMovie';
import mockAxios from '@/tests/mockAxios';
import { API_URL } from '@/api';

describe('Vuex: Movies', () => {
  let store: Store<State> = null;
  let module: Movies = null;

  beforeEach(() => {
    store = createStore<State>({
      modules: {
        movies: Movies,
      },
    });

    module = getModule(Movies, store);
  });

  describe('Actions', () => {
    it('loadMovie', async () => {
      mockAxios({
        url: `${API_URL}/shows/1`,
        data: baseMovie,
      });

      const movie = await module.loadMovie(1);

      expect(movie).toEqual(baseMovie);
    });

    it('loadMovie NotFound', async () => {
      const movie = await module.loadMovie(1);

      expect(movie).toEqual(null);
    });

    it('loadMovies', async () => {
      const mockMovies = [{ ...baseMovie, id: 1 }, { ...baseMovie, id: 2, name: 'Second' }];

      mockAxios({
        url: `${API_URL}/shows`,
        data: mockMovies,
      });

      const movies = await module.loadMovies();

      expect(movies.length).toBe(2);
      expect(movies[1].name).toBe('Second');
    });

    it('loadSearch', async () => {
      const mockMovies = [
        { score: 95, show: { ...baseMovie, id: 1 } },
        { score: 55, show: { ...baseMovie, id: 2, name: 'Second' } },
      ];

      mockAxios({
        url: `${API_URL}/search/shows`,
        data: mockMovies,
        params: {
          q: 'Test query',
        },
      });

      const movies = await module.loadSearch('Test query');

      expect(movies.length).toBe(2);
      expect(movies[1].name).toBe('Second');
    });
  });

  describe('Mutations', () => {
    it('setMovie', () => {
      module.setMovie(baseMovie);

      expect(module.movie).toEqual(baseMovie);
    });

    it('setMovies', () => {
      module.setMovies([baseMovie, { ...baseMovie, id: 2 }]);

      expect(module.movies.length).toBe(2);
      expect(module.movies[1]).toEqual({ ...baseMovie, id: 2 });
    });
  });

  describe('Getters', () => {
    it('getGenres', () => {
      module.setMovies([{ ...baseMovie, genres: ['Comedy', 'Drama'] }, { ...baseMovie, genres: ['Horror', 'Drama'] }]);

      expect(module.getGenres.sort()).toEqual(['Comedy', 'Horror', 'Drama'].sort());
    });

    it('getGenresMovies', () => {
      module.setMovies([{ ...baseMovie, genres: ['Comedy', 'Drama'] }, { ...baseMovie, genres: ['Horror', 'Drama'] }]);

      const genresMovies = module.getGenresMovies;
      expect(genresMovies.Comedy.length).toBe(1);
      expect(genresMovies.Drama.length).toBe(2);
    });

    it('getGenresMovies should be sorted', () => {
      module.setMovies([
        {
          ...baseMovie, genres: ['Horror', 'Drama'], weight: 15, name: 'Lowest',
        },
        {
          ...baseMovie, genres: ['Comedy', 'Drama'], weight: 75, name: 'Highest',
        },
        {
          ...baseMovie, genres: ['Drama'], weight: 55, name: 'Middle',
        },
      ]);

      const genresMovies = module.getGenresMovies;
      expect(genresMovies.Drama.length).toBe(3);
      expect(genresMovies.Drama[0].name).toBe('Highest');
      expect(genresMovies.Drama[2].name).toBe('Lowest');
    });
  });
});
