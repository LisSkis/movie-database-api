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
  res.send('This is my site');
});

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
