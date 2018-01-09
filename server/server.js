import express from 'express';
import Sequelize from 'sequelize';
import pg from 'pg';

const app = express();
const port = process.env.PORT || 3000;
const dbUrl = process.env.DATABASE_URL || 'postgres://jxpiolxvcavudw:5ca7d5239b2360e639e09e791ebc934ddc4698825fdbebe0e638bd93ee280ce9@ec2-54-83-59-144.compute-1.amazonaws.com:5432/dd3u2ejnlqqah4';

app.post('/movies', (req, res) => {

});

app.get('/movies', (req, res) => {

});

app.post('/comments', (req, res) => {

});

app.get('/comments', (req, res) => {

});

app.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/db', {results: result.rows} ); }
    });
  });
});

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
