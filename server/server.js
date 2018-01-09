import express from 'express';
import request from 'request';
import pg from 'pg';

import sequelize from './db/db';
import Movie from './models/movie';

const app = express();
const omdbApiKey = '7cd5879e';
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/movies', (req, res) => {
  const title = req.body.title
  const omdbUrl = `https://www.omdbapi.com/`;
  request.get({
    uri: omdbUrl,
    qs: {
      t: title,
      apikey: omdbApiKey,
    },
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const movieData = JSON.parse(body);
      Movie.create({
        title,
        released: movieData.Released,
        runtime: movieData.Runtime,
        genre: movieData.Genre,
        metascore: movieData.Metascore,
        production: movieData.Production,
      }).then(() => {
        res.send('saved');
      });
    } else {
      res.send(error);
    }
  })
});

app.get('/movies', (req, res) => {
  pg.connect(dbUrl, (err, client, done) => {
    client.query('SELECT * FROM movies', (err, result) => {
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
