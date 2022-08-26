# Reactful Notes (React Note Taking App)
By Larren Canapi

## How to run with Docker:
- Ensure docker and docker-compose is installed correctly
- Have the repo downloaded and open a new terminal in the repo directory
- Call 'docker-compose up' in your terminal which will build the app image and pull a postgres image
- Navigate to localhost:8080 to see the app
- If running into issues, check that the environment variables are set correctly in docker-compose.yml

## How to run locally:
In a separate terminal and in the app directory: 
- 'npm install' to install node_modules
- 'npm start' to run on localhost
- Make sure to run docker image of 'postgres' to connect to with the settings specified in
docker-compose.yml

## Design Architecture
- 1 NodeJS Server Image that will service my front-end React note taking app and 
will listen to requests and will respond by querying our Postgres database image
- 1 Postgres Image that holds our database to hold all of our notes
  
## Packages/Libraries/Technologies Used:
- React https://reactjs.org/
    - Create-React-App https://github.com/facebook/create-react-app
- React Bootstrap https://react-bootstrap.github.io/
- localStorage
- Express
- Nodejs
- Axios
  
## General References (General documentation lookup for technologies)
- General References to React Documentation and React Hooks Documentation
    - https://reactjs.org/docs/getting-started.html
    - https://reactjs.org/docs/lists-and-keys.html
    - https://reactjs.org/docs/hooks-reference.html
- General References to React Bootstrap Documentation: https://react-bootstrap.github.io/
- General References to MDN Documentation for Javascript and CSS:
    - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference
    - https://developer.mozilla.org/en-US/docs/Web/CSS/Reference
- In NoteList.js
    - Referred and used the examples in the Bootstrap ListGroup Docs to make the note list
        - https://react-bootstrap.netlify.app/components/list-group/#list-groups
    - Referred and used the examples in the Bootstrap Modal Docs to make the note modal
        - https://react-bootstrap.netlify.app/components/modal/#modals
- In NoteForm.js
    - Referred and used the examples in the Bootstrap Forms Docs to make the note form
        - https://react-bootstrap.netlify.app/forms/overview/
    - Referred and used the examples in the Bootstrap Form Validation Docs to get error handling correct and how forms work in React Bootstrap
        - https://react-bootstrap.netlify.app/forms/validation/