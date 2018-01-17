# nodejs-task
This is the task I had to do for recruitment process for the position of Node.js Developer at Netguru.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
### Prerequisites
To run the code you will need node.js installed on your machine.

I personally used Node v9.2.0 so that's what I would recomend.
### Running server
After cloning repository run `npm install` inside the folder and wait till it's done.

To start the server use `npm start`.

To run the tests you can use `npm test` to run them just once, or `npm run test-watch` to start test,
monitor code for changes and automatically restart the server once change occures.

## Live Version
You can access server on: https://thawing-stream-29258.herokuapp.com

## Available endpoints
### POST /movies
* Data Params

**Required:**

`title=[string]` - Title of movie you want to add

* Success Response:
  * **Code:** 200
  * **Content:**
```
      {
        "id": 1,
        "Title": "The Godfather",
        "Year": 1972,
        "Rated": "R",
        "Released": "24 Mar 1972",
        "Runtime": "175 min",
        "Genre": "Crime, Drama",
        "Director": "Francis Ford Coppola",
        "Plot": "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
        "Language": "English, Italian, Latin",
        "Poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BY2Q2NzQ3ZDUtNWU5OC00Yjc0LThlYmEtNWM3NTFmM2JiY2VhXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
        "Ratings": [
            {
                "Source": "Internet Movie Database",
                "Value": "9.2/10"
            },
            {
                "Source": "Rotten Tomatoes",
                "Value": "99%"
            },
            {
                "Source": "Metacritic",
                "Value": "100/100"
            }
        ],
        "Metascore": 100,
        "BoxOffice": "N/A",
        "Production": "Paramount Pictures",
        "Website": "http://www.thegodfather.com",
        "createdAt": "2018-01-10T06:41:11.254Z",
        "updatedAt": "2018-01-10T06:41:11.254Z"
      }
```
* Error Response:
  * **Code:** 400<br />
    **Content:** Request body should contain title, but it is missing.
  * **Code:** 404<br />
    **Content:** Movie not found!

### GET /movies
* URL Params

**Optional:**

`sort[year || metascore]=[asc || desc]` - Use to sort response by year or metascore<br />
`filter[propName]=[string]` - Use to get only results where prop is value you specify

* Success Response:
  * **Code:** 200
  * **Content:**
```
[
  movies: {
    "id": 1,
    "Title": "The Godfather",
    "Year": 1972,
    "Rated": "R",
    "Released": "24 Mar 1972",
    "Runtime": "175 min",
    "Genre": "Crime, Drama",
    "Director": "Francis Ford Coppola",
    "Plot": "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    "Language": "English, Italian, Latin",
    "Poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BY2Q2NzQ3ZDUtNWU5OC00Yjc0LThlYmEtNWM3NTFmM2JiY2VhXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
    "Ratings": [
        {
            "Source": "Internet Movie Database",
            "Value": "9.2/10"
        },
        {
            "Source": "Rotten Tomatoes",
            "Value": "99%"
        },
        {
            "Source": "Metacritic",
            "Value": "100/100"
        }
    ],
    "Metascore": 100,
    "BoxOffice": "N/A",
    "Production": "Paramount Pictures",
    "Website": "http://www.thegodfather.com",
    "createdAt": "2018-01-10T06:41:11.254Z",
    "updatedAt": "2018-01-10T06:41:11.254Z"
  },
]
```
* Error Response:
  * **Code:** 400<br />
    **Content:** Problem occured while fetching data
 
### POST /comments
* Data Params

**Required:**

`text=[string]` - Text of comment you want to add<br />
`movieId=[integer]` - Id of a movie to which you want to add a comment

* Success Response:
  * **Code:** 200
  * **Content:**
```
{
    "id": 2,
    "text": "this is other comment",
    "movieId": 3,
    "updatedAt": "2018-01-10T10:51:41.364Z",
    "createdAt": "2018-01-10T10:51:41.364Z"
}
```
* Error Response:
  * **Code:** 400<br />
    **Content:** Request body should contain text and movieId, but something is missing.
    
### GET /comments
* URL Params

**Optional:**

`movieId=[string]` - Id of a movie which comments you want to fetch

* Success Response:
  * **Code:** 200
  * **Content:**
```
[
  {
    "id": 2,
    "text": "this is other comment",
    "movieId": 3,
    "updatedAt": "2018-01-10T10:51:41.364Z",
    "createdAt": "2018-01-10T10:51:41.364Z"
  }
]
```
* Error Response:
  * **Code:** 400<br />
    **Content:** Problem occured while fetching data
