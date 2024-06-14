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

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = personsData.find((person) => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = personsData.filter((person) => person.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const person = req.body;
  const ids = personsData.map((person) => person.id);
  const maxId = Math.max(...ids);
  const newPerson = {
    id: maxId + 1,
    name: person.name,
    number: person.number,
  };
  personsData = [...personsData, newPerson];
  res.status(201).json(newPerson);
  personsData.concat(newPerson);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
