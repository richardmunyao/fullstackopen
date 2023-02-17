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

### Testing Backend and Frontend integration
Before proceeding further, it would be a good idea to test our backend and frontend integration.
For that, we'll need axios.
#### Axios
Axios is a promised-based HTTP client for JavaScript. It has the ability to make HTTP requests from the browser and handle the transformation of request and response data. 
In the frontend, do:

> npm install axios

Now, I want to fetch some 'notes' data from the backend server and display it on my frontend (:3000) page. I will need:
1. Axios (to make requests and handle promises)
2. State and Effect hooks to update my frontend component with the response
So, my frontend `App.js` now looks like so:
```
import {useState, useEffect} from 'react'
import axios from 'axios'


const App = () => {  
  const [notes, setNotes] = useState([])
  
  //effect hook to update component
  const hook = () => {
    axios
    .get('http://localhost:3001/api/notes')
    .then(response => {      
      setNotes(response.data)
    })   
  }  
  useEffect(hook, [])    

  return (
    <div>
      <h1>Hello world. Good</h1>
      <ul>
        {notes.map(note =>         
          <li key={note.id}>{note.content}</li>)}
      </ul>      
    </div>
  )
}
export default App;
```

Seems like a lot to check integration; I could have just `console.log`ged it, but I wanted to have a visual representation at least.

Anyways, it works, and we can get the data from the backend server.

### Database.
We shall be using Mongo DB Atlas as our provider. In case I forget, refer to the excellent tutorial at fullstackopen, but it was pretty straight forward.
Anyway, I do not think we can create more than two clusters at once, so I just created another database to the existing cluster.
The url string should be modified to include the name of the current DB, like so:
`mongodb+srv://<yourUsername>:<yourPassword>@cluster0.fbs6utd.mongodb.net/<yourDatabaseName>?retryWrites=true&w=majority`

### Mongoose
API to connect to MongoDB
> npm install mongoose

We can test connectivity to DB by creating a new file `mongo.js`
```
const mongoose = require('mongoose')
const url = 'mongodb+srv://fullstack:<password>@cluster0.fbs6utd.mongodb.net/blogNotesApp?retryWrites=true&w=majority'
mongoose.set('strictQuery', false)
mongoose.connect(url)

const blogSchema = new mongoose.Schema({
  content: String,
  votes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
  content: 'Learning HTML',
  votes: 5,
})

blog.save().then(result => {
  console.log('blog saved!')
  mongoose.connection.close()
})
```
Then confirm on your browser in the `collections` tab that the data has been updated.

The next part shall be deployment, but I shall write that part after I complete the exercise.


