import express from 'express';
import request from 'request';
import _ from 'lodash';

import sequelize from './db/db';
import Movie from './models/movie';
import Comment from './models/comment';

const app = express();
const omdbApiKey = '7cd5879e';
const omdbUrl = `https://www.omdbapi.com/`;
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/movies', (req, res) => {
  const title = req.body.title;
  if (!title) {
    return res.status(400).send('Request body should contain title, but it is missing.');
  }

  request.get({
    uri: omdbUrl,
    qs: {
      t: title,
      apikey: omdbApiKey,
    },
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const movieData = JSON.parse(body);
      movieData.Year = parseInt(movieData.Year);
      movieData.Metascore = parseInt(movieData.Metascore);
      if (!movieData.Error) {
        for(let i = 0; i < movieData.Ratings.length; i += 1) {
          movieData.Ratings[i] = JSON.stringify(movieData.Ratings[i]);
        }
        Movie.sync().then(() => {
          Movie.findOrCreate({where: {Title: title}, defaults: movieData})
          .spread((movie, created) => {
            if (created) {
              const data = movie.get({plain: true});
              for(let i = 0; i < data.Ratings.length; i += 1) {
                data.Ratings[i] = JSON.parse(data.Ratings[i]);
              }
              res.send(data);
            } else {
              res.status(400).send('Movie already exists in database');
            }
          });
        }).catch(e => res.status(400).send(e));
      } else {
        res.status(404).send(JSON.parse(body).Error);
      }
    } else {
      res.send(error);
    }
  })
});
 
app.get('/movies', (req, res) => {
  const query = {};
  const { filter, sortBy, sortType } = req.query;

  if (sortBy && (sortBy.toLowerCase() === 'metascore' || sortBy.toLowerCase() === 'year')) {
    query.order = [[_.capitalize(sortBy), 'DESC']];
  }
  if (sortType && sortBy && (sortType.toLowerCase() === 'desc' || sortType.toLowerCase() === 'asc')) {
    query.order[0][1] = sortType;
  }

  if (filter) {
    query.where = filter;
  }

  Movie.sync().then(() => {
    Movie.findAll(query).then((movies) => {
      movies.forEach((movie) => {
        for(let i = 0; i < movie.Ratings.length; i += 1) {
          movie.Ratings[i] = JSON.parse(movie.Ratings[i]);
        }
      });
      res.send({movies});
    }).catch(e => res.status(400).send(e));
  }).catch(e => res.status(400).send(e));
});

app.post('/comments', (req, res) => {
  const comment = _.pick(req.body, ['text', 'movieId']);
  if (!comment.text || !comment.movieId) {
    return res.status(400).send('Request body should contain text and movieId, but something is missing.')
  }

  Comment.sync().then(() => {
    Comment.create(comment).then((data) => {
      res.send(data);
    }).catch(e => res.status(400).send(`Error ${e.original.code}: ${e.original.detail}`));
  }).catch(e => res.status(400).send(e));
});

app.get('/comments', (req, res) => {
  if (req.query.movieId) {
    Comment.findAll({ where: { movieId: req.query.movieId }}).then((comments) => {
      res.send(comments);
    }).catch(e => res.status(400).send(e));
  } else {
    Comment.sync().then(() => {
      Comment.all().then((comments) => {
        res.send(comments);
      }).catch(e => res.status(400).send(e));
    });
  }
});

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});

export default app;
