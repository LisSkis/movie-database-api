import express from 'express';
import Sequelize from 'sequelize';
import pg from 'pg';

const app = express();
const port = process.env.PORT || 3000;

/* app.post('/movies', (req, res) => {

});

app.get('/movies', (req, res) => {

});

app.post('/comments', (req, res) => {

});

app.get('/comments', (req, res) => {

}); */

app.get('/', (req, res) => {
  pg.connect(process.env.DATABASE_URL, (err, client, done) => {
    client.query('INSERT INTO test_table VALUES($1, $2) RETURNING *', ['test 1', 'test2'], (err, result) => {
      done();
      if (err) {
        return res.send(`Error: ${err}`);
      }

      return res.send(result);
    });
  });
});

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
