import Sequelize from 'sequelize';
import sequelize from '../db/db';

const Movie = sequelize.define('movie', {
  title: {
    type: Sequelize.STRING,
  },
  release: {
    type: Sequelize.STRING,
  },
  runtime: {
    type: Sequelize.STRING,
  },
  genre: {
    type: Sequelize.STRING,
  },
  metascore: {
    type: Sequelize.STRING,
  },
  production: {
    type: Sequelize.STRING,
  },
});

export default Movie;
