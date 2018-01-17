require('dotenv').config();
import Sequelize from 'sequelize';

const env = process.env.NODE_ENV || 'development';
let dbUrl = '';
if (env === 'test') {
  dbUrl = process.env.HEROKU_POSTGRESQL_COPPER_URL;
} else if (env === 'development') {
  dbUrl = process.env.HEROKU_POSTGRESQL_BLUE_URL;
} else {
  dbUrl = process.env.DATABASE_URL;
}
const sequelize = new Sequelize(dbUrl, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: true,
  },
  logging: false,
});

export default sequelize;