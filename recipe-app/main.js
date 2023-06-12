const express = require("express");

const app = express();

app.use(express.json());

let PORT = 9091;

let db = [];

let counter = 1;

app.post("/recipes", function (req, res) {
  let t = req.body.title;

  let n = req.body.notes;

  let newEntry = {
    title: t,
    notes: n,
    id: counter,
  };
  counter++;

  db.push(newEntry);

  res.json(newEntry);
});

app.get("/recipes", function (req, res) {
  let summaries = db.map(function (element) {
    let summary = {};
    summary.title = element.title;
    summary.done = element.done;
    summary.id = element.id;
    return summary;
  });
  res.json(summaries);
});

app.get("/recipes/:id", function (req, res) {
  let id = req.params.id;
  let found = db.find(function (element) {
    if (element.id == id) {
      return true;
    } else {
      return false;
    }
  });

  if (found) {
    res.json(found);
  } else {
    res.sentStatus(404);
  }
});

app.delete("/recipes/:id", function (req, res) {
  let id = req.params.id;
  let newDB = db.filter(function (element) {
    return element.id != id;
  });
  db = newDB;
  res.json({ message: "Entry deleted successfully" });
});

app.put("/recipes/:id", function (req, res) {
  let id = req.params.id;
  let title = req.body.title;
  let notes = req.body.notes;
  let done = req.body.done == true;

  let found = db.find(function (element) {
    if (element.id == id) {
      return true;
    } else {
      return false;
    }
  });

  if (found) {
    found.title = title;
    found.notes = notes;
    found.done = done;
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

app.listen(PORT, function () {
  console.log("Recipe App started on port", PORT);
});