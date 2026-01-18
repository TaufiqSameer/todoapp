const http = require('http');
const handleit = require('./routing')

const server = http.createServer(handleit);

const PORT = 8000;

server.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
})