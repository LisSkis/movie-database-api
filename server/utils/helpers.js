export const getQuery = ({ filter, sort }) => {
  const query = { order: [] };

  if (sort) {
    if (sort.metascore) {
      query.order.push(['Metascore', sort.metascore]);
    }
    if (sort.year) {
      query.order.push(['Year', sort.year]);
    }
  }

  if (filter) {
    query.where = filter;
  }

  return query;
}

export const parseRatings = ( movieRatings ) => {
  for(let i = 0; i < movieRatings.length; i += 1) {
    movieRatings[i] = JSON.parse(movieRatings[i]);
  }

  return movieRatings;
}

export const prepareMovieToAdd = (movieData) => {
  movieData.Year = parseInt(movieData.Year);
  movieData.Metascore = parseInt(movieData.Metascore);
  for(let i = 0; i < movieData.Ratings.length; i += 1) {
    movieData.Ratings[i] = JSON.stringify(movieData.Ratings[i]);
  }

  return movieData;
}
