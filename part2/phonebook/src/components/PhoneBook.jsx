const PhoneBook = ({
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
  handleSubmit,
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          Name:{" "}
          <input
            value={newName}
            onChange={handleNameChange}
            className="phonebook-input one"
          />
        </div>
        <div>
          Number:{" "}
          <input
            value={newNumber}
            onChange={handleNumberChange}
            className="phonebook-input two"
          />
        </div>
        <div>
          <button className="phonebook-button" type="submit">
            add
          </button>
        </div>
      </form>
    </div>
  );
};

export default PhoneBook;
