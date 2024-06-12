import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PhoneBook from "./components/PhoneBook";
import { getAll, create, update, remove } from "../util/api";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState("");

  useEffect(() => {
    const fetchPersons = async () => {
      const personsData = await getAll();
      setPersons(personsData);
    };
    fetchPersons();
  }, []);

  const showNotification = (message, type = "success") => {
    setNotification(message);
    setNotificationType(type);
    setTimeout(() => {
      setNotification(null);
      setNotificationType("");
    }, 5000);
  };

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
        const result = await update(person.id, updatedPerson);
        if (result.error) {
          showNotification(
            `Error updating ${newName}: ${result.error}`,
            "error"
          );
        } else {
          setPersons(
            persons.map((p) => (p.id !== person.id ? p : result.data))
          );
          showNotification(`Updated ${newName}'s number to ${newNumber}`);
        }
      }
    } else {
      const newPerson = { name: newName, number: newNumber };
      const result = await create(newPerson);
      if (result.error) {
        showNotification(`Error adding ${newName}: ${result.error}`, "error");
      } else {
        setPersons(persons.concat(result.data));
        showNotification(`Added ${newName} with number ${newNumber}`);
      }
    }
    setNewName("");
    setNewNumber("");
  };

  const handleDelete = async (id) => {
    const person = persons.find((p) => p.id === id);
    const confirmDelete = window.confirm(`Delete ${person.name}?`);
    if (confirmDelete) {
      const result = await remove(id);
      if (result.error) {
        showNotification(
          `Error deleting ${person.name}: ${result.error}`,
          "error"
        );
      } else {
        setPersons(persons.filter((p) => p.id !== id));
        showNotification(`Deleted ${person.name}`);
      }
    }
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} type={notificationType} />
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
