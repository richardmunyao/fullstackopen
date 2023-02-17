# Notes for future me
Because I keep forgetting
## Procedure for starting a full react app, with separate backend

### Frontend
> npx create-react-app 'bloglist'

In `index.js` do:

``
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
``

In `app.js` do something simple to test, like:

``
const App = () => {

  return (
    <div>
      <h1>Hello world</h1>
    </div>
  )
}
export default App;
``

> cd bloglist
> npm run start

Open localhost:3000 to test



