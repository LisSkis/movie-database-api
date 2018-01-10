import Sequelize from 'sequelize';

import sequelize from '../db/db';
import Movie from '../models/movie';

const Comment = sequelize.define('comment', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  movieId: {
    type: Sequelize.INTEGER,
    references: {
      model: Movie,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
    },
  },
  text: Sequelize.STRING,
});

export default Comment;
