interface Movie {
  id: number,
  name: string,
  genres: string[],
  image?: {
    medium?: string,
    original?: string
  },
  weight: number,
  summary: string,
  rating?: {
    average: number
  },
  language: string
}

export default Movie;
