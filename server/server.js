import express from 'express';
import Sequelize from 'sequelize';
import pg from 'pg';

const app = express();
const port = process.env.PORT || 3000;
const dbUrl = process.env.DATABASE_URL || 'postgres://jxpiolxvcavudw:5ca7d5239b2360e639e09e791ebc934ddc4698825fdbebe0e638bd93ee280ce9@ec2-54-83-59-144.compute-1.amazonaws.com:5432/dd3u2ejnlqqah4';

app.post('/movies', (req, res) => {

});

app.get('/movies', (req, res) => {
  pg.connect(dbUrl, (err, client, done) => {
    client.query('SELECT * FROM test_table', (err, result) => {
      if (err) return res.send(`Error: ${err}`);

      res.send(result);
    });
  });
});

app.post('/comments', (req, res) => {

});

app.get('/comments', (req, res) => {

});

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
