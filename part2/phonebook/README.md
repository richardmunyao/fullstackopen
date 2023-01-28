### Some notes to remember workflow:
Go to the root directory of project (same level package.json is found)
To use the json server:
1. Install json server:
``npm install -g json-server``
2. Install Axios
``npm install axios``
3. Install json-server as a development dependency:
``npm install json-server --save-dev``
4. In package.json, modify the "scripts" section:
to add "server" at the end of the entries, like so:
`` "server": "json-server -p3001 --watch db.json" ``
5. Open both your json-server and your app server, in two separate terminals:
``npm run server``
and in the second terminal:
``npm start``

### Important!
Make sure you're in the right directory when installing them packages and running the npm scripts!!