import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import shortUUID from "short-uuid";

const app = express();
const port = 3000;
// const short = UUID;
// const short = require("short-uuid");

app.use(bodyParser.json());
app.use(cors());

const users = [
  { id: "1", name: "John", surname: "Smith", country: "USA", salary: 6000 },
  { id: "2", name: "Emma", surname: "Wilson", country: "UK", salary: 5500 },
  {
    id: "3",
    name: "Hans",
    surname: "Müller",
    country: "Germany",
    salary: 7000,
  },
];

//Home Page
app.get("/", (req, res) => {
  res.status(200).send("Welcome to Home Page");
});

//Get all users
app.get("/users", (req, res) => {
  res.status(200).send(users);
});

//Get lowest salary user
app.get("/users/lowest-salary", (request, response) => {
  const searchedUser = users.reduce(
    (acc, curr) => (curr.salary < acc.salary ? curr : acc),
    users[0]
  );
  response.json(searchedUser);
});

//Get highest salary user
app.get("/users/highest-salary", (request, response) => {
  const searchedUser = users.reduce(
    (acc, curr) => (curr.salary > acc.salary ? curr : acc),
    users[0]
  );
  response.json(searchedUser);
});

//Get country "Switzerland"
app.get("/users/:country=switzerland", (request, response) => {
  const searchedUser = users.find((user) => user.country === "Switzerland");
  response.json(JSON.stringify(searchedUser));
});

//Create a new user
app.post("/users", (request, response) => {
  const aUser = request.body;
  aUser.id = shortUUID.generate();
  users.push(aUser);
  response.json(users);
});

app.listen(port, () => {
  console.log(`ReST API is running on port ${port}`);
});
