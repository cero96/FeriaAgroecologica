import React from "react";

const SearchBar = ({ search, setSearch }) => {
  return (
    <>
      <style>{`
        .search-bar {
          width: 100%;
          max-width: 400px;
          margin: 0 auto 2rem;
          display: flex;
          justify-content: center;
        }

        .search-bar input {
          width: 100%;
          padding: 0.8rem 1rem;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 1rem;
          outline: none;
          transition: border 0.3s;
        }

        .search-bar input:focus {
          border-color: #2e4d25;
          box-shadow: 0 0 5px rgba(46, 77, 37, 0.5);
        }
      `}</style>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar producto por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </>
  );
};

export default SearchBar;
