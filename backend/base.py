import os
from flask import Flask
from flask_restful import reqparse, abort, Api, Resource
from pymongo import MongoClient
from dotenv import load_dotenv
from flask import jsonify

load_dotenv()
USER = os.getenv("USER")
PASSWORD = os.getenv("PASSWORD")
HOST = os.getenv("HOST")
DB_NAME = os.getenv("DB_NAME")

app = Flask(__name__)
api = Api(app)
mongo = MongoClient()

Forms = {
    'form1': {'form_name': 'Lorem Ipsum'},
    'form2': {'form_name': 'Lorem Ipsum 2'},
    'form3': {'form_name': 'Lorem Ipsum 3'},
}

def mongodb_conn():
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


@app.route("/")
def HelloWorld():
    resp = jsonify({"message": "Hello"})
    return resp

def abort_if_form_doesnt_exist(form_id):
    if form_id not in Forms:
        abort(404, message="form {} doesn't exist".format(form_id))

parser = reqparse.RequestParser()
parser.add_argument('form_name')

# Form
# shows a single form item and lets you delete a form item
class Form(Resource):
    def get(self, form_id):
        abort_if_form_doesnt_exist(form_id)
        return Forms[form_id]

    def delete(self, form_id):
        abort_if_form_doesnt_exist(form_id)
        del Forms[form_id]
        return '', 204

    def put(self, form_id):
        args = parser.parse_args()
        form_name = {'form_name': args['form_name']}
        Forms[form_id] = form_name
        return form_name, 201

# FormList
# shows a list of all Forms, and lets you POST to add new forms
class FormList(Resource):
    def get(self):
        return Forms

    def post(self):
        args = parser.parse_args()
        form_id = int(max(Forms.keys()).lstrip('form')) + 1
        form_id = 'form%i' % form_id
        Forms[form_id] = {'form_name': args['form_name']}
        return Forms[form_id], 201

api.add_resource(FormList, '/Forms')
# api.add_resource(Form, '/Forms/<form_id>')

if __name__ == '__main__':
    app.run(debug=True)
