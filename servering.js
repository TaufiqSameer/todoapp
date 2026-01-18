const http = require("http");
const fs = require("fs");
const { parse } = require("path");
const { json } = require("stream/consumers");

//require is used to import modules user defined and built in both are done by require which is CommonJs MODULE
//HTTP is a protocol which is used for connection between broweser and server tho it is not encrpyed where MITM attacks are good for intercepting the data
//A functon can be semt by reference, or anonmyous or arrow functions

const servering = (req, res) => {
  console.log(req.headers, req.url, req.method);
  res.setHeader("Content-type", "text/html");
  if (req.url === "/") {
    res.write("<html>");
    res.write("<body>");
    res.write("<h1>Enter your details</h1>");
    res.write('<form action="/submit-details" method="POST">');
    res.write(
      '<input type="text" name="username" placeholder="Enter your username"><br>',
    );
    res.write('<input type="radio" name="gender" value="male"><br>');
    res.write('<label for="male">Male</label>');
    res.write('<input type="radio" name="gender" value="female"> Female<br>');
    res.write('<button type="submit">Submit</button>');
    res.write("</form>");
    res.write("<h2>This is my web</h2>");
    res.write("</body>");
    res.write("</html>");
    return res.end();
  } else if (req.url === "/home") {
    res.write("<button>Click me </button>");
    res.write("If u click this ur retard");
    return res.end();
  } else if (
    req.url.toLowerCase() === "/submit-details" &&
    req.method === "POST"
  ) {
    const body = [];
    // body.push('sameer');
    // body.push('tausif');

    // for(let i of body){
    //   console.log((i));
    // }
    res.write("<h1>welcome to subimt detials");
    req.on("data", (chunck) => {
      body.push(chunck);
      console.log(`The given chunck is ${chunck}`);
    });
    req.on("end", () => {
      const pasrsed = Buffer.concat(body).toString();
      console.log(pasrsed);
      const urlparams = new URLSearchParams(pasrsed);
      const jsonbody = {};
      // const objec = object.fromEntries(urlparams);
      for (const [key, vale] of urlparams.entries()) {
        jsonbody[key] = vale;
      }
      console.log(jsonbody);
      const jsooned = JSON.stringify(jsonbody);
      fs.writeFileSync("output.txt", jsooned, (err) => {
        if (err) {
          console.log("error occured");
          res.statusCode(404);
        }
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
};

module.exports = {
  handleit : servering};
/*
Node Lifecycle and event loop:
Node.js is single threaded 

Redirecting requests:
We direct the user to different location after a particular process has finished its execution

like we can use form action to do this 
we will use req.url to do this 

routing requests : req.url -> gives ways to handles routes 

requests->Node.server->others
when an requests come it goes into event queue and that events takes the resources from thread pool (database,file system and networks)
when the job is done we will give a callback 
Event loop : the loop which always listen

*/
