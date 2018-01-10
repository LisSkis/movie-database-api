import Sequelize from 'sequelize';

import sequelize from '../db/db';

const Movie = sequelize.define('movie', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Title: Sequelize.STRING,
  Year: Sequelize.INTEGER,
  Rated: Sequelize.STRING,
  Released: Sequelize.STRING,
  Runtime: Sequelize.STRING,
  Genre: Sequelize.STRING,
  Director: Sequelize.STRING,
  Plot: Sequelize.STRING,
  Language: Sequelize.STRING,
  Poster: Sequelize.STRING,
  Ratings: Sequelize.ARRAY(Sequelize.JSON),
  Metascore: Sequelize.INTEGER,
  BoxOffice: Sequelize.STRING,
  Production: Sequelize.STRING,
  Website: Sequelize.STRING,
});

export default Movie;
