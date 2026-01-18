const http = require("http");
const requesthandler = require("./servering");

const server = http.createServer(requesthandler);

server.listen(3001, () => {
  console.log(`Server is hosted on http://localhost:3001`);
});
