import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PhoneBook from "./components/PhoneBook";
import { getAll, create, update, remove } from "../util/api";

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
    const person = persons.find((p) => p.name === newName);

    if (person) {
      const confirmUpdate = window.confirm(
        `${newName} is already in the phonebook, replace the old number with a new one?`
      );
      if (confirmUpdate) {
        const updatedPerson = { ...person, number: newNumber };
        try {
          const returnedPerson = await update(person.id, updatedPerson);
          setPersons(
            persons.map((p) => (p.id !== person.id ? p : returnedPerson))
          );
        } catch (error) {
          console.log(error);
        }
        setNewName("");
        setNewNumber("");
      }
    } else {
      const newPerson = { name: newName, number: newNumber };
      try {
        const addedPerson = await create(newPerson);
        setPersons(persons.concat(addedPerson));
      } catch (error) {
        console.log(error);
      }
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
