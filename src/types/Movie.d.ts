interface Movie {
  id: number,
  name: string,
  slug: string,
  genres: string[],
  image: {
    medium: string,
    original: string
  },
  weight: number
}

export default Movie;
