import express from 'express';
import request from 'request-promise-native';
import _ from 'lodash';

import sequelize from './db/db';
import Movie from './models/movie';
import Comment from './models/comment';
import { 
  getQuery,
  parseRatings,
  prepareMovieToAdd,
} from './utils/helpers';

const app = express();
const omdbUrl = process.env.OMDB_URL;
const omdbApiKey = process.env.OMDB_API_KEY;
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/movies', async (req, res) => {
  const title = req.body.title;
  if (!title) {
    return res.status(400).send('Request body should contain title, but it is missing.');
  }

  try {
    const movieBody = await request.get({
      uri: omdbUrl,
      qs: {
        t: title,
        apikey: omdbApiKey,
      },
    });

    const parsedMovieBody = JSON.parse(movieBody);
    if (!parsedMovieBody.Error) {
      const movieData = prepareMovieToAdd(parsedMovieBody);
      console.log(movieData);
      await Movie.sync();
      const [movie, created] = await Movie.findOrCreate({where: {Title: title}, defaults: movieData});
      if (created) {
        const data = movie.get({plain: true});
        data.Ratings = parseRatings(data.Ratings);
        res.send(data);
      } else {
        res.status(400).send('Movie already exists in database');
      }
    } else {
      res.status(404).send(parsedMovieBody.Error);
    }
  } catch (e) {
    res.status(404).send(e);
  }
});
 
app.get('/movies', async (req, res) => {
  const query = getQuery(req.query);

  try {
    await Movie.sync();
    const movies = await Movie.findAll(query);
    movies.forEach(movie => movie.Ratings = parseRatings(movie.Ratings));
    res.send({movies});
  } catch (e) {
    res.status(400).send(e);
  }
    
});

app.post('/comments', async (req, res) => {
  const comment = _.pick(req.body, ['text', 'movieId']);
  if (!comment.text || !comment.movieId) {
    return res.status(400).send('Request body should contain text and movieId, but something is missing.')
  }

  try {
    await Comment.sync();
    const data = await Comment.create(comment);
    res.send(data);
  } catch (e) {
    res.status(400).send(e);
  }
  
});

app.get('/comments', async (req, res) => {
  try {
    if (req.query.movieId) {
      await Comment.sync();
      const comments = await Comment.findAll({ where: { movieId: req.query.movieId }});
      res.send(comments);
    } else {
      await Comment.sync()
      const comments = await Comment.all();
      res.send(comments);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});

export default app;
