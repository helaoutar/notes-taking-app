# Notes taking app

- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)
- The app is deployed on Vercel: [https://notes-taking-app.vercel.app/](https://notes-taking-app.vercel.app/)

#### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

You need to run `yarn` the first time to install the app dependencies.

#### `Features`

- The user can create a new note.
- The user can edit and delete a note.
- The user is be able to navigate through multiple notes.
- The user can search through notes.
- Markdown editor.
- Notes are persisted in the browser.

#### `Implementation details`

- State management is achieved using React context.
- Notes are persisted in IndexDB.
- Ant design is used for Layout and Icons.
- Styled components are used for styling.
- react-draft-wysiwyg for markdown which is based on Draft.js.

![App Screenshot](/public/screenshot.png)
