from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from tmdbv3api import TMDb
from tmdbv3api import Movie
import requests
import pickle
from flask_cors import CORS
import nltk
from nltk.corpus import stopwords
from bs4 import BeautifulSoup
import re
import string

app = Flask(__name__)
CORS(app, resources={r"/allmovies": {"origins": "http://localhost:5173"}})
CORS(app, resources={r"/reviews": {"origins": "http://localhost:5173"}})
CORS(app, resources={r"/recommend": {"origins": "http://localhost:5173"}})

def load_similarity():
    df = pd.read_csv('./data/final_data.csv')
    df['movie_id'] = df['movie_id'].astype(str).str.split('.').str[0]
    similarity = pickle.load(open('./models/similarity.pkl', 'rb'))

    return df,similarity

def recommend_movies(movie_id, max_results=15):
    df, similarity = load_similarity()

    if isinstance(max_results, str):
        max_results = int(max_results) 
    if movie_id not in df['movie_id'].unique():
        print(movie_id)
        return 'Sorry but the movie you requested does not exist in out database'
    
    i = df.loc[df.movie_id==movie_id].index[0]

    movies = list(enumerate(similarity[i]))
    movies = sorted(movies, key=lambda x:x[1], reverse=True)
    # excluse the first element because it is the movie itself
    movies = movies[1:max_results+1]

    recommendations = {"results": []}

    for film in movies:
        movie_id_ = df.loc[film[0], 'movie_id']
        recommendations['results'].append(movie_id_)
    return recommendations

def preprocess_text(text):
    # remove html strips
    soup = BeautifulSoup(text, "html.parser")
    text = soup.get_text()
    # remove sqaure brackets
    text = re.sub('\[[^]]*\]', '', text)    
    # tokenization
    text = np.array(nltk.word_tokenize(text))
    # lower text
    text = np.char.lower(text) #text = text.lower()
    # remove special characters
    #text = [i for i in text if i.isalnum()]
    text = text[np.char.isalnum(text)]
    mask = np.logical_not(np.logical_and(np.isin(text, stopwords.words('english')), np.isin(text, string.punctuation)))
    text = text[mask]
    # text stemming
    ps = nltk.porter.PorterStemmer()
    text = [ps.stem(i) for i in text]

    return " ".join(text)

def preditct_sentiment(text:str, transformer, model):
    text = preprocess_text(text)
    text_vector = transformer.transform([text]).toarray()
    prediction = model.predict(text_vector)
    return prediction

def get_movie_reviews(movie_id, max_results:int=10):

    API_KEY = '4c225c866aa84f4ef450043654ec9e56' 
    url = f'https://api.themoviedb.org/3/movie/{movie_id}/reviews?api_key={API_KEY}'
    response = requests.get(url)
    if response.status_code == 404:
        return " "
    data = response.json()['results']
    # if len(data) == 0:
    #     return 'No reviews found for this movie'
    model = pickle.load(open('./models/nlp_model.pkl', 'rb'))
    tfidf = pickle.load(open('./models/tfidf.pkl', 'rb'))
    reviews = {"results": []}
    for review in data:
        details = {}
        details['author'] = review['author']
        details['content'] = review['content']
        sentiment = preditct_sentiment(details['content'], model=model, transformer=tfidf)
        details['sentiment'] = 'Good' if sentiment else 'Bad'
        reviews["results"].append(details)

        if len(reviews) == max_results:
            break      
    return reviews

@app.route('/allmovies', methods=['GET'])
def allmovies():
    df = pd.read_csv('./data/final_data.csv')
    movies = df.loc[:, 'movie_title'].str.title().tolist()
    return jsonify(movies), 200

@app.route('/')
def home():
    return 'home there'

@app.route('/recommend', methods=['GET'])
def recommend():
    movie_id = request.args.get('movie_id')
    max_results = request.args.get('max_results')
    if not movie_id:
        return jsonify({"error": "Movie name is required as a query parameter"}), 400
    if max_results is None:
        max_results = 15
    recommendations = recommend_movies(movie_id, max_results)
    if isinstance(recommendations, str):
        return jsonify({"error": "Movie name doesn't exist in our database"}), 400
    return jsonify(recommendations), 200

@app.route('/reviews', methods=['GET'])
def get_reviews():
    movie_id = request.args.get('movie_id')
    print(movie_id)
    if not movie_id:
        return jsonify({"error": "Movie name is required as a query parameter"}), 400
    reviews = get_movie_reviews(movie_id)
    if isinstance(reviews, str):
        return jsonify({"error": "There is reviews for this film"}), 400
    return jsonify(reviews), 200
    


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)