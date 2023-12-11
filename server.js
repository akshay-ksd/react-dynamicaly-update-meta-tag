const express = require("express");
const path = require("path");
const fs = require("fs");

const PORT = 4000;

const app = express();

// Define a route that accepts a dynamic title as a query parameter
app.get("/", (req, res) => {
  // Extract the title from the query parameters, defaulting to "Home Page"
  const title = req.query.title || "Home Page";
  
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    // Replace placeholders in the HTML with dynamic values
    data = data
      .replace(/__TITLE__/g, title)
      .replace(/__DESCRIPTION__/g, "Home page description.");

    res.send(data);
  });
});

// Similar route for the "/about" page
app.get("/about", (req, res) => {
  const title = req.query.title || "About Page";
  
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    data = data
      .replace(/__TITLE__/g, title)
      .replace(/__DESCRIPTION__/g, "About page description.");

    res.send(data);
  });
});

app.use(express.static(path.resolve(__dirname, "./build")));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
