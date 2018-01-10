import expect from 'expect';
import request from 'supertest';

import app from '../server';
import Movie from '../models/movie';
import Comment from '../models/comment';

beforeEach((done) => {
  Movie.sync({ force: true }).then(() => {
    Comment.sync({ force: true }).then(() => {
      const moviesPromises = [];
      moviesPromises.push(Movie.create({
        "Title": "Guardians of the Galaxy Vol. 2",
        "Year": 2017,
        "Rated": "PG-13",
        "Released": "05 May 2017",
        "Runtime": "136 min",
        "Genre": "Action, Adventure, Sci-Fi",
        "Director": "James Gunn",
        "Plot": "The Guardians must fight to keep their newfound family together as they unravel the mystery of Peter Quill's true parentage.",
        "Language": "English",
        "Poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTg2MzI1MTg3OF5BMl5BanBnXkFtZTgwNTU3NDA2MTI@._V1_SX300.jpg",
        "Ratings": [
          JSON.stringify({
            "Source": "Internet Movie Database",
            "Value": "7.8/10"
          }),
          JSON.stringify({
          "Source": "Rotten Tomatoes",
          "Value": "83%"
          }),
          JSON.stringify({
          "Source": "Metacritic",
          "Value": "67/100"
          })
        ],
        "Metascore": 67,
        "BoxOffice": "$389,804,217",
        "Production": "Walt Disney Pictures",
        "Website": "https://marvel.com/guardians"
      }));
      moviesPromises.push(Movie.create({
        "Title": "Forrest Gump",
        "Year": 1994,
        "Rated": "PG-13",
        "Released": "06 Jul 1994",
        "Runtime": "142 min",
        "Genre": "Drama, Romance",
        "Director": "Robert Zemeckis",
        "Writer": "Winston Groom (novel), Eric Roth (screenplay)",
        "Language": "English",
        "Poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
        "Ratings": [
        JSON.stringify({
        "Source": "Internet Movie Database",
        "Value": "8.8/10"
        }),
        JSON.stringify({
        "Source": "Rotten Tomatoes",
        "Value": "71%"
        }),
        JSON.stringify({
        "Source": "Metacritic",
        "Value": "82/100"
        })
        ],
        "Metascore": 82,
        "BoxOffice": "$330,000,000",
        "Production": "Paramount Pictures",
        "Website": "http://www.paramount.com/movies/forrest-gump/",
      }));
      Promise.all(moviesPromises).then(() => {
        const commentsPromises = [];
        commentsPromises.push(Comment.create({
          text: 'Test Comment 1',
          movieId: 1,
        }));
        commentsPromises.push(Comment.create({
          text: 'Test Comment 2',
          movieId: 2,
        }));
        Promise.all(commentsPromises).then(() => {
          done();
        });
      });
    });
  });
});

describe('POST /movies', () => {
  it('should create new movie', (done) => {
    const title = "The Godfather";
    request(app)
      .post('/movies')
      .send({title})
      .expect(200)
      .expect((res) => {
        expect(res.body.Title).toBe(title);
      })
      .end(done);
  });

  it('should return 400 when no title provided', (done) => {
    request(app)
      .post('/movies')
      .expect(400)
      .end(done);
  });

  it('should return 400 when adding movie that exists in database', (done) => {
    const title = 'Guardians of the Galaxy Vol. 2';
    request(app)
      .post('/movies')
      .send({title})
      .expect(400)
      .end(done);
  });
});

describe('GET /movies', () => {
  it('should get all movies', (done) => {
    request(app)
      .get('/movies')
      .expect(200)
      .expect((res) => {
        expect(res.body.movies.length).toBe(2);
      })
      .end(done);
  });

  it('should get movies sorted ascending by year', (done) => {
    request(app)
      .get('/movies')
      .query({ sortBy: 'year', sortType: 'asc' })
      .expect(200)
      .expect((res) => {
        expect(res.body.movies.length).toBe(2);
        expect(res.body.movies[0].Title).toBe('Forrest Gump');
        expect(res.body.movies[1].Title).toBe('Guardians of the Galaxy Vol. 2');
      })
      .end(done);
  });

  it('should get movies sorted descending by year', (done) => {
    request(app)
      .get('/movies')
      .query({ sortBy: 'year', sortType: 'desc' })
      .expect(200)
      .expect((res) => {
        expect(res.body.movies.length).toBe(2);
        expect(res.body.movies[0].Title).toBe('Guardians of the Galaxy Vol. 2');
        expect(res.body.movies[1].Title).toBe('Forrest Gump');
      })
      .end(done);
  });

  it('should get movies from year 1994', (done) => {
    request(app)
      .get('/movies')
      .query({ "filter[Year]": 1994 })
      .expect(200)
      .expect((res) => {
        expect(res.body.movies.length).toBe(1);
        expect(res.body.movies[0].Title).toBe('Forrest Gump');
      })
      .end(done);
  });
});

describe('POST /comments', () => {
  it('should add comment', (done) => {
    const text = 'Test comment';
    const movieId = 1;
    request(app)
      .post('/comments')
      .send({ movieId, text })
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
        expect(res.body.movieId).toBe(movieId);
      })
      .end(done);
  });

  it('should return 400 when body is missing movieId or text', (done) => {
    request(app)
      .post('/comments')
      .expect(400)
      .end(done);
  });

  it('should return 400 when passed not existing movieId', (done) => {
    request(app)
      .post('/comments')
      .send({ movieId: 312, text: 'Test text' })
      .expect(400)
      .end(done);
  });
});

describe('GET /comments', () => {
  it('should get all comments', (done) => {
    request(app)
      .get('/comments')
      .expect(200)
      .expect((res) => {
        expect(res.body.length).toBe(2);
      })
      .end(done);
  });

  it('should get comments with movieId of 1', (done) => {
    request(app)
      .get('/comments')
      .query({ movieId: 1 })
      .expect(200)
      .expect((res) => {
        expect(res.body.length).toBe(1);
        expect(res.body[0].text).toBe('Test Comment 1');
      })
      .end(done);
  });
});
