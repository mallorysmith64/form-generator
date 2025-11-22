import datetime
import json
import os
from bson import ObjectId
from bson import json_util
import json
from flask import Flask, request
from flask_restful import reqparse, abort, Api, Resource
from pymongo import MongoClient
#change to dotenv 11/20/25
from dotenv import load_dotenv
# from dotenv import load_dotenvbson
from flask import jsonify
from flask_cors import CORS

load_dotenv()
USER = os.getenv("USER")
PASSWORD = os.getenv("PASSWORD")
HOST = os.getenv("HOST")
DB_NAME = os.getenv("DB_NAME")

app = Flask(__name__)
api = Api(app)
#change to allow vite and frontend 11/20/25
CORS(app, resources={r"/*": {"origins": ["http://localhost:5173", "http://localhost:3000"]}})
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


@app.route("/Publish", methods=["POST"])
def submit_form():
    data = request.get_json()  # get the form data
    result = collection_forms.insert_one(data)
    form_id = str(result.inserted_id)
    # form_url = f"http://example.com/forms/{object_id}"
    return jsonify({'form_id': form_id})


def convert_to_list(obj):
    if isinstance(obj, set):
        return list(obj)
    raise TypeError(
        f"Object of type {obj.__class__.__name__} is not JSON serializable")


@app.route("/Publish/<formId>", methods=["GET"])
def get_form(formId):
    form = collection_forms.find_one({'_id': ObjectId(formId)})
    if form:
        formId = convert_to_list({formId})
        return jsonify({'form_id': formId})
    else:
        return jsonify({'error': 'Form not found'}), 404

#remove old cors 11/20/25
# cors = CORS(app, resources={'/*': {'origins': 'http://localhost:5000'}})

if __name__ == '__main__':
    app.run(debug=True)


# @app.route('/Publish', methods=["POST"])
# def save_data():
#     print("Hit endpoint")
#     data = request.get_json()  # Get data from the request
#     print("payload", data)
#     collection_forms.insert_one(data)
#     return "Data saved successfully", 201


# @app.route('/Publish', methods=["POST"])
# def save_data():
#     data = request.get_json()  # Get data from the request
#     print("payload", data)
#     # check for payload with key "task_data"
#     if data and "task_data" in data:
#         task_data = []
#         elements = set()  # use a set to keep track of elements
#         for item in data["task_data"]:
#             # check if the element has been added already
#             if item["id"] not in elements:
#                 updated_fields = {key: val for key, val in item.items() if key != 'content' or (
#                     key == 'content' and val != "Placeholder")}
#                 task_data.append(updated_fields)
#                 elements.add(item["id"])
#         # create a new data object with only the updated task data
#         updated_data = {'task_data': task_data}
#         print(updated_data)
#         # Save the data to the collection
#         collection_forms.insert_one(updated_data)
#         print(collection_forms)
#         return "Data saved successfully", 201
#     return "Data saved successfully", 201


# @app.route('/Publish', methods=["POST"])
# def save_data():
#     data = request.get_json()  # Get data from the request
#     print("payload", data)
#     # check for payload with key "task_data"
#     if data and "task_data" in data:
#         task_data = []
#         for item in data["task_data"]:
#             updated_fields = {key: val for key, val in item.items() if key != 'content' or (
#                 key == 'content' and val != "Placeholder")}
#             task_data.append(updated_fields)
#         # create a new data object with only the updated task data
#         updated_data = {'task_data': task_data}
#         print(updated_data)
#         # Save the data to the collection
#         collection_forms.insert_one(updated_data)
#         print(collection_forms)
#         return "Data saved successfully", 201
#     return "Data saved successfully", 201
# if not data or '_id' in data and not data["_id"]:
#     return "No data provided", 400
# else:
#     if "_id" in data:
#         data["_id"] = ObjectId(data["_id"])
#         task_data = []  # get list of task data items
#         for item in task_data:
#             # only include fields that have been updated, do not include "Placeholder" text
#             placeholder_text = "Placeholder"
#             updated_fields = {key: val for key, val in item.items() if key != 'content' or (
#                 key == 'content' and val != placeholder_text)}
#             task_data.append(updated_fields)
#             # create a new data object with only the updated task data
#             updated_data = {'task_data': task_data}
#             print(updated_data)
#             # Save the data to the collection
#             collection_forms.insert_one(updated_data)
#             print(collection_forms)
#         return "Data saved successfully", 201
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
