const Filter = ({ filter, onFilterChange }) => {
  return (
    <div>
      <label htmlFor="search-input" className="filter-label">
        Filter Contacts:
      </label>
      <input
        id="search-input"
        placeholder="Search for contacts"
        value={filter}
        onChange={onFilterChange}
      />
    </div>
  );
};

export default Filter;
