import express from "express";

const app = express();
app.use(express.json());
const PORT = 3001;

let personsData = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  res.json(personsData);
});

app.get("/api/persons/info", (req, res) => {
  const date = new Date();
  res.send(
    `<p>Phonebook has info for ${personsData.length} people</p>
      <br>
      <p>${date}</p>`
  );
});
