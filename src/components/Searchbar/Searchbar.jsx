import React, { useState } from 'react';

const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = event => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(searchQuery);
  };

  return (
    <header className="searchbar">
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Search images and photos"
        />
        <button type="submit" className="button">
          Search
        </button>
      </form>
    </header>
  );
};

export default Searchbar;
