import type Movie from '@/types/Movie';

const baseMovie: Movie = {
  id: 1,
  name: 'Hulk',
  genres: ['Comedy', 'Drama'],
  image: {
    original: 'https://website.com/original.png',
    medium: 'https://website.com/medium.png',
  },
  summary: '<p>The description of movie</p>',
  weight: 55,
  language: 'English',
};

export default baseMovie;
