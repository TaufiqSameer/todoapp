const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  console.log(req);
  res.setHeader("Content-type", "text/html");
  if (req.url === "/") {
    res.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Mybntra</title>
                    <nav>
                        <ul>
                        <li><a href="/home">Home</a></li>
                        <li><a href="/men">men</a></li>
                        <li><a href="/woemn">woemn</a></li>
                        <li><a href="/cart">cart</a></li>
                        </ul>
                </head>
                <body>
                    
                </body>
                </html>
            `);

    res.end();
  } else if (req.url === "/home") {
    res.write("<h1>welcome to home");
    return res.end();
  }
  else if (req.url === "/submit-details") {
    res.write("<h1>welcome to subimt detials");
    res.on('data', (chunck) => {
      console.log(`The given chunck is ${chunck}`);
    })
    return res.end();
  }
  else if (req.url === "/home") {
    res.write("<h1>welcome to home");
    return res.end();
  }
});

server.listen(3001, () => {
  console.log("Listening at http://localhost:3001");
});
