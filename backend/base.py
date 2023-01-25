import os
from flask import Flask
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()
USER = os.getenv("USER")
PASSWORD = os.getenv("PASSWORD")
HOST = os.getenv("HOST")
DB_NAME = os.getenv("DB_NAME")

# def mongodb_conn():
try:
    database = MongoClient(
        f"mongodb+srv://{USER}:{PASSWORD}@{HOST}/{DB_NAME}?retryWrites=true&w=majority")
    print("Successfully connected to MongoDB Atlas")
    # Create a New Database - dictionary style
    form_db = database['form_generator_db']
    # Create a Collection - dictionary style
    col_clients = form_db['clients']
    # Insert a Single Document
    document = {'name': 'john doe', 'email': "johndoe@gmail.com"}
    col_clients.insert_one(document)
    print(f"\nCollections in the Database form_generator_db: ",
          form_db.list_collection_names())
    print(f"\nDocuments in the clients Collection")
    client_docs = col_clients.find()
    # Print each Document
    for doc in client_docs:
        print(doc)
except Exception as e:
    print(f"Error - Could not connect to mongo: {e}")


app = Flask(__name__)
app.config.from_pyfile('settings.py')


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"
