import datetime
import json
import os
from bson import ObjectId
from bson import json_util
import json
from flask import Flask, request
from flask_restful import reqparse, abort, Api, Resource
from pymongo import MongoClient
from dotenv import load_dotenv
# from dotenv import load_dotenvbson
from flask import jsonify
from flask_cors import CORS

load_dotenv()
USER = os.getenv("MONGO_USER")
PASSWORD = os.getenv("MONGO_PASSWORD")
HOST = os.getenv("MONGO_HOST")
DB_NAME = os.getenv("DB_NAME")

app = Flask(__name__, static_folder="static", static_url_path="")
api = Api(app)

# CORS origin is configurable per environment via .env; defaults to the
# local Vite dev server port if not set.
CORS(app, resources={r"/Publish/*": {"origins": os.getenv("CORS_ORIGIN", "http://localhost:5173")}})

Forms = {
    'form1': {'form_name': 'Lorem Ipsum'},
    'form2': {'form_name': 'Lorem Ipsum 2'},
    'form3': {'form_name': 'Lorem Ipsum 3'},
}

try:
    database = MongoClient(
    f"mongodb+srv://{USER}:{PASSWORD}@{HOST}/?appName=fgen-cluster-1")
    form_db = database[DB_NAME]
    # Create a Collection - dictionary style
    collection_forms = form_db['forms'] 
    print("Successfully connected to MongoDB Atlas")
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
    
@app.route('/Publish/', methods=['POST'])
def save_form():
    print("p1, save form function")
    data = request.json
    print("p2, data received:", data)
    result = collection_forms.insert_one(data)
    print("p3, form saved with id:", result.inserted_id)
    return {"form_id": str(result.inserted_id)}, 200

def convert_to_list(obj):
    if isinstance(obj, set):
        return list(obj)
    raise TypeError(
        f"Object of type {obj.__class__.__name__} is not JSON serializable")


@app.route('/Publish/<form_id>', methods=['GET'])
def get_form(form_id):
    try:
        # Find the form by its unique Mongo ID
        form = collection_forms.find_one({"_id": ObjectId(form_id)})
        
        if form:
            form['_id'] = str(form['_id']) # Convert ObjectId to string for JSON
            form['form_id'] = form['_id'] # Consistent key for the frontend to read
            return jsonify(form), 200
        return jsonify({"error": "Form not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_frontend(path):
    # Serve a real built file (JS, CSS, images, etc.) if the path matches one.
    if path and os.path.exists(os.path.join(app.static_folder, path)):
        return app.send_static_file(path)
    # Otherwise (any client-side route like /FormBuilder or /FormView/123),
    # fall back to index.html and let React Router handle it.
    return app.send_static_file('index.html')

if __name__ == '__main__':
    app.run(debug=True)