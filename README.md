
# Movie Whisper

![Python](https://img.shields.io/badge/Python-3.8-blueviolet)
![Framework](https://img.shields.io/badge/Framework-Flask-red)
![Frontend](https://img.shields.io/badge/Frontend-HTML/CSS/JS-green)
![API](https://img.shields.io/badge/API-TMDB-fcba03)

Movie Whisper is a web app that provides movie recommendations using AI-based content-based filtering, specifically cosine similarity, and sentiment analysis on movie reviews. The application is built with React (using Vite as the development environment) and tailwind for the front-end, and it relies on a Flask API for the back-end.
**You can run the app online using [this link](https://zaraki000.github.io/vite-deploy/).**





## Run Locally

1. Clone the project

```bash
  git clone https://github.com/ALIDmed/movie-whisper.git
```

2. Go to the project directory

```bash
  cd movie-whisper
```

3. Install dependencies
* python packages
```bash
  pip install -r requirements.txt
```
* node packages
```bash
  cd client
  npm install
```
4. Get tmdb API key

Create an account in https://www.themoviedb.org/, click on the `API` link from the left hand sidebar in your account settings and fill all the details to apply for API key. If you are asked for the website URL, just give "NA" if you don't have one. You will see the API key in your `API` sidebar once your request is approved. then replace your apikey in app.py `API_KEY` and also in client components `apiKey`

5. Start the server

* start the flask api
```bash
  python app.py
```

```bash
  cd client
  npm run dev
```

6. That's it 😁


## How recommendation works?

Cosine similarity is a method when used in movie recommendation systems to measure the similarity between movies based on their features. Each movie is represented as a vector in a high-dimensional space, with each feature contributing to its position in the space. Cosine similarity calculates how similar two movies are by measuring the cosine of the angle between their feature vectors. Movies with a higher cosine similarity are considered more similar and are recommended to users who have previously liked or interacted with similar movies. This helps in providing personalized movie recommendations based on user preferences and movie features.

![image](https://user-images.githubusercontent.com/36665975/70401457-a7530680-1a55-11ea-9158-97d4e8515ca4.png)


## Datasets

1. [IMDB 5000 Movie Dataset](https://www.kaggle.com/carolzhangdc/imdb-5000-movie-dataset)
2. [The Movies Dataset](https://www.kaggle.com/rounakbanik/the-movies-dataset)
3. [List of movies in 2018](https://en.wikipedia.org/wiki/List_of_American_films_of_2018)
4. [List of movies in 2019](https://en.wikipedia.org/wiki/List_of_American_films_of_2019)
5. [List of movies in 2020](https://en.wikipedia.org/wiki/List_of_American_films_of_2020)
5. [List of movies in 2021](https://en.wikipedia.org/wiki/List_of_American_films_of_2021)
5. [List of movies in 2022](https://en.wikipedia.org/wiki/List_of_American_films_of_2022)
5. [List of movies in 2023](https://en.wikipedia.org/wiki/List_of_American_films_of_2023)


