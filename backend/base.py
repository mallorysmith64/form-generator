import os
from bson import ObjectId
from flask import Flask, request
from flask_restful import reqparse, abort, Api, Resource
from pymongo import MongoClient
from dotenv import load_dotenv
from flask import jsonify
from flask_cors import CORS

load_dotenv()
USER = os.getenv("USER")
PASSWORD = os.getenv("PASSWORD")
HOST = os.getenv("HOST")
DB_NAME = os.getenv("DB_NAME")

app = Flask(__name__)
api = Api(app)
CORS(app)
db = MongoClient()

Forms = {
    'form1': {'form_name': 'Lorem Ipsum'},
    'form2': {'form_name': 'Lorem Ipsum 2'},
    'form3': {'form_name': 'Lorem Ipsum 3'},
}


# def mongodb_conn():
try:
    database = MongoClient(
        f"mongodb+srv://{USER}:{PASSWORD}@{HOST}/{DB_NAME}?retryWrites=true&w=majority")
    print("Successfully connected to MongoDB Atlas")
    # Create a New Database - dictionary style
    form_db = database['form_generator_db']
    # Create a Collection - dictionary style
    collection_forms = form_db['forms']
    # Insert a Single Document
    # document = {'name': 'john doe', 'email': "johndoe@gmail.com"}
    # collection_forms.insert_one(document)
    print(f"\nCollections in the Database form_generator_db: ",
          form_db.list_collection_names())
    print(f"\nDocuments in the forms Collection")
    form_docs = collection_forms.find()
    # Print each Document
    for doc in form_docs:
        print(doc)
except Exception as e:
    print(f"Error - Could not connect to mongo: {e}")


@app.route("/")
def HelloWorld():
    resp = jsonify({"message": "Hello"})
    return resp


@app.route('/Publish', methods=["POST"])
def save_data():
    data = request.get_json()  # Get data from the request
    # check if data is empty or contains empty _id field
    if not data or '_id' in data and not data["_id"]:
        return "No data provided", 400
    else:
        if "_id" in data:
            data["_id"] = ObjectId(data["_id"])

            task_data = []  # get list of task data items
            for item in task_data:
                # only include fields that have been updated, do not include "Placeholder" text
                placeholder_text = "Placeholder"
                updated_fields = {key: val for key, val in item.items() if key != 'content' or (
                    key == 'content' and val != placeholder_text)}
                task_data.append(updated_fields)
                # Save the data to the collection
                collection_forms.insert_one(data)
            return "Data saved successfully", 201


# delete all documents in form collection
# db = database["form_generator_db"]
# collection_forms = db["forms"]
# all_docs = collection_forms.delete_many({})
# print(all_docs.deleted_count, "documents deleted.")

# delete many documents in form collection via regex
# db = database["form_generator_db"]
# collection_forms = db["forms"]
# query = {"test": {"$regex": "^t"}}
# docs = collection_forms.delete_many(query)
# print(docs.deleted_count, "documents deleted.")

# delete single document in form collection
# db = database["form_generator_db"]
# collection_forms = db["forms"]
# query = { "test": "test" }
# doc = collection_forms.delete_one(query)
# print(doc.deleted_count, "was deleted.")


cors = CORS(app, resources={'/*': {'origins': 'http://localhost:5000'}})

if __name__ == '__main__':
    app.run(debug=True)
