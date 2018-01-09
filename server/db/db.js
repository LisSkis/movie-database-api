import Sequelize from 'sequelize';

const dbUrl = process.env.DATABASE_URL || 'postgres://jxpiolxvcavudw:5ca7d5239b2360e639e09e791ebc934ddc4698825fdbebe0e638bd93ee280ce9@ec2-54-83-59-144.compute-1.amazonaws.com:5432/dd3u2ejnlqqah4';
const sequelize = new Sequelize(dbUrl);

export default sequelize;