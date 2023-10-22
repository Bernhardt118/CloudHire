# How to set up environment
Need to install the environment package on your machine:

`sudo apt install python3-virtualenv`

Create the environment

`virtualenv env`

### How to run the test environment
Within the group_20 folder, type the following command in console: 

`source env/bin/activate`

### Install project dependencies

`pip install -r requirements.txt`

`npm install package.json`

It is advised to program in the environment, to step out of the environment, type the following in command in console:

`deactivate`

### Installing new project dependencies
You need to add the dependency to the requirements file.

`pip install -r rquirements.txt`

`pip install <package>`

`pip freeze > requirements.txt`

# Running the app

## Start the virtual environment

`source env/bin/activate`

## First time run
### Configure the run file to the flask app

`export FLASK_APP=backend/server.py`

### Run Backend

`flask run`

### Run Frontend

`yarn run dev-server`

in the command line within the project folder, and then
put localhost:8080 in your browser

# Frontend Errors
```
If node module errors with frontend
verions needed :

node - 17.7.1

https://phoenixnap.com/kb/update-node-js-version   -- how to upgrade node - put in version number

npm - 8.5.2

yarn - 1.22.17
yarn run - 1.22.17
sudo npm yarn@1.22.17 -g

nvm - 0.39.1
https://tecadmin.net/how-to-install-nvm-on-ubuntu-20-04/ - how to install nvm

yarn add normalize.css@7.0.0

HowTo:
npm install package.json
npm update -f
```

