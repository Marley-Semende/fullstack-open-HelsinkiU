import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PhoneBook from "./components/PhoneBook";
import { getAll, create, remove } from "../util/api.js";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchPersons = async () => {
      const personsData = await getAll();
      setPersons(personsData);
    };
    fetchPersons();
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const personExists = persons.some((person) => person.name === newName);

    if (personExists) {
      alert(`The name ${newName} is already added to the phonebook!`);
    } else {
      const newPerson = { name: newName, number: newNumber };
      const addedPerson = await create(newPerson);
      setPersons(persons.concat(addedPerson));
      setNewName("");
      setNewNumber("");
    }
  };

  const handleDelete = async (id) => {
    const person = persons.find((p) => p.id === id);
    const confirmDelete = window.confirm(`Delete ${person.name}?`);
    if (confirmDelete) {
      await remove(id);
      setPersons(persons.filter((p) => p.id !== id));
    }
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PhoneBook
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      {filteredPersons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
          <button onClick={() => handleDelete(person.id)}>Delete</button>
        </p>
      ))}
    </div>
  );
};

export default App;
