# How to Get Started

## Before You Can Begin

* Know where you want to save the project on your machine first.

* You will need to create an SSH key on GitHub to access the repo: [Adding SSH Keys to GitHub](https://www.example.com). Please note that the SSH key will expire fairly quickly when following GitHub's documentation, but by following it, you will at least get access to the repo, and be able to do the next step below.

* Use the SSH option in GitHub. It should look similar to this: </br>
Ex: git clone git@github.com:<repo_owner_username>/<repo_name>.git

* Get into the project: </br>
Ex: cd form-generator-1.0

* Open in your IDE of choice. </br>
Ex: code .

## To Start Frontend

* cd frontend
* yarn init (Press enter on all the prompts as they come up.)
* yarn install (This will install most of the dependencies you will need. Please make sure you are in the frontend directory before installing.) </br>

* yarn add sass --save-dev (Install this dependency to fix the "sass" not found error.)
* yarn add uuid (this fixes build errors like Rollup failed to resolve import "uuid")

* yarn build
* yarn preview (Run this to see project in the browser. You are all set!)

## To Start Backend

* cd backend
* flask run (You will get an error that says "could not connect to mongo". Create your own database and collections as desired. You are all set!)
