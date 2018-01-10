import Sequelize from 'sequelize';

const env = process.env.NODE_ENV || 'development';
let dbUrl = '';
if (env === 'test') {
  dbUrl = process.env.HEROKU_POSTGRESQL_COPPER_URL || 'postgres://qmqjujqbflcfzt:db98727433424832d42db2d54d8686b73cccb61008d89cbdda5dd42423df7248@ec2-23-23-110-26.compute-1.amazonaws.com:5432/d5g35d0j63pjbc';
} else if (env === 'development') {
  dbUrl = process.env.HEROKU_POSTGRESQL_BLUE_URL || 'postgres://lnpzhurjdithrv:0e671109e7fecb4d2a477c29981fd37cef0469fd2f32609a00a265ba809a121a@ec2-54-83-59-144.compute-1.amazonaws.com:5432/d1jpi99glc2o8l';
} else {
  dbUrl = process.env.DATABASE_URL || 'postgres://jxpiolxvcavudw:5ca7d5239b2360e639e09e791ebc934ddc4698825fdbebe0e638bd93ee280ce9@ec2-54-83-59-144.compute-1.amazonaws.com:5432/dd3u2ejnlqqah4';
}
const sequelize = new Sequelize(dbUrl, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: true,
  },
  logging: false,
});

export default sequelize;