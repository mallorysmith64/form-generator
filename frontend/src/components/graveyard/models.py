import os
from flask import Flask
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()
USER = os.getenv("USER")
PASSWORD = os.getenv("PASSWORD")
HOST = os.getenv("HOST")
DB_NAME = os.getenv("DB_NAME")

app = Flask(__name__)
app.config["MONGO_URI"] = f"mongodb+srv://{USER}:{PASSWORD}@{HOST}/{DB_NAME}?retryWrites=true&w=majority"

mongo = MongoClient(app)

class Form:
    def __init__(self, form_name, description, form_elements):
        self.form_name = form_name
        self.description = description
        self.form_elements = form_elements

    def save_to_mongo(self):
        mongo.db.forms.insert_one({
            "form_name": self.form.name,
            "description": self.description,
            "form_elements": self.form_elements
        })

    @classmethod
    def from_mongo(cls, id):
        form_data = mongo.db.forms.find_one({"_id": id})
        return cls(**form_data)