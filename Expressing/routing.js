const add = require("./add");

let objing;
const handleit = (req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>Welcome to the Calculator app");
    res.write('<a href="/calculator">Click here</a>');
    res.end();
  } else if (req.url === "/calculator") {
    res.writeHead(200, { "Content-Type": "text/html" });

    res.write("<h2>Enter two values</h2>");
    res.write('<form action="/calculate" method="POST">');

    res.write('<label for="number1">num1:</label>');
    res.write('<input type="number" name="number1" id="number1"><br><br>');

    res.write('<label for="number2">num2:</label>');
    res.write('<input type="number" name="number2" id="number2"><br><br>');

    res.write('<button type="submit">Calculate</button>');
    res.write("</form>");

    return res.end();
  } else if (req.url === "/calculate" && req.method == "POST") {
    const body = [];

    req.on("data", (chunk) => body.push(chunk));

    req.on("end", () => {
      const parsed = Buffer.concat(body).toString();
      const urlparams = new URLSearchParams(parsed);

      const jsonbody = {};
      for (const [key, value] of urlparams.entries()) {
        jsonbody[key] = value;
      }

      const num1 = Number(jsonbody.number1);
      const num2 = Number(jsonbody.number2);

      objing = { num1, num2 };

      res.statusCode = 302;
      res.setHeader("Location", "/calculate-result");

      res.end();
    });
  } else if (req.url === "/calculate-result" && req.method === "GET") {
    res.setHeader("Content-type", "text/html");
    const { num1, num2 } = objing;
    const sum = Number(num1) + Number(num2);

    res.write(`
        <html>
          <head><title>Result</title></head>
          <body>
            <h1>Calculation Result</h1>
            <p>${num1} + ${num2} = <strong>${sum}</strong></p>
            <a href="/calculator">Go Back</a>
          </body>
        </html>
      `);
  }
};

module.exports = handleit;
