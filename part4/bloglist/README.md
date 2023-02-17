# Notes for future me
Because I keep forgetting
## Procedure for starting a full react app, with separate backend
Front end is rather simple, backend requires a bit more work.

## Frontend
> npx create-react-app 'bloglist'

In `index.js` do:

```
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
```

In `app.js` do something simple to test, like:

```
const App = () => {

  return (
    <div>
      <h1>Hello world</h1>
    </div>
  )
}
export default App;
```

> cd bloglist
> npm run start

Open localhost:3000 to test. That's basically it for the frontend.

## Backend
Find an appropriate folder, and do:
> npm init

Respond to the prompts to create a `package.json` file.
Edit this json file and in the "scripts" section, add the srart command like so:

```
 "scripts": {
    "start": "node index.js",
    ...
    }
```

Next, create a simple index.js, with say, a console message like so:
```
console.log("Hello world")
```

> npm start

Should echo 'hello world' on the terminal.

## Backend Server
### Express Library
We use Express library. Install it in our backend:
> npm install express

To test it, we can edit the index.js (on the backend) file to look something like so:

```
const express = require('express')
const app = express()

let notes = [
   ...
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
```
Here we've defined our routes and ports and thanks to the express library, we're listening on port 3001 for any requests. To test, do:

> npm start 

on visiting `localhost:3001/api/notes` You should get sered with the list of notes objects you've defined, or visiting `localhost:3001` Should show you a html page with 'hello world'.

### Nodemon
To avoid ctrl+c everytime we change something on the backend, it would be useful to watch the directory for changes and auto restart:

> npm install --save-dev nodemon

Next, create a script for it in package.json:

```
"scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
```

To start server in dev mode, run:
> npm run dev


### CORS
To avoid same origin policy errors, we enable legitimate cross origin resource sharing. Always in the backend, do:

> npm install cors

And in the index.js (of the backend) add cors middleware:

```
const cors = require('cors')
app.use(cors())
```







