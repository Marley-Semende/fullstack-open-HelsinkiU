import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PhoneBook from "./components/PhoneBook";
import { getAll, create } from "../util/api";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const personsData = await getAll();
        setPersons(personsData);
      } catch (error) {
        console.log(error);
      }
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
      try {
        await create(newPerson);
        setPersons([...persons, newPerson]);
        setNewName("");
        setNewNumber("");
      } catch (error) {
        console.log(error);
      }
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
        handleNameChange={(handleNameChange, handleNumberChange, handleSubmit)}
      />
      <h2>Numbers</h2>
      {filteredPersons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default App;
