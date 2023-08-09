# kaimai-test

Install scripts with 'npm i'

Starting the server:
Type 'npm run start-server' from the root directory.

- thinking about it, you may have to visit the server and client directories and do an 'npm i' in them as well. Oops.

Starting the client:
Type 'npm run start-client' in a new terminal, also from the root directory.
Open http://localhost:3001 in your browser if it not done for you automatically.

Running tests:
Type 'npx jest' from the root directory, although the server on port 3000 has to be stopped even though I tried to force it to create a new one.

I went about this task in perhaps not the implied order. I got the backend running and tested with Postman and decided to write tasks to a Json file to save time not re-entering tasks. I added some Jest tests and went onto start work on the front end. I would have moved onto other additional features if I had spent more time on this.
