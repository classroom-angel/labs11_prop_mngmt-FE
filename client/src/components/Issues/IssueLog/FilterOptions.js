import React from 'react';

const FilterOptions = ({ handleDropChange, statuses, tags }) => (
  <>
    {/*Dropdown Trigger */}
    <button
      className="dropdown-trigger btn cyan darken-4"
      data-target="dropdown1"
    >
      Status
    </button>
    {/* Dropdown Structure */}
    <ul id="dropdown1" className="dropdown-content">
      <li key={0} onClick={handleDropChange} name="filterStatus" value="all">
        All
      </li>
      {statuses.map((status, index) => {
        return (
          <li
            key={index + 1}
            onClick={handleDropChange}
            name="filterStatus"
            value={status}
          >
            {status}
          </li>
        );
      })}
    </ul>
    <button
      className="dropdown-trigger btn cyan darken-4"
      data-target="dropdown2"
    >
      Tags
    </button>
    {/* Dropdown Structure */}
    <ul id="dropdown2" className="dropdown-content">
      <li key={0} onClick={handleDropChange} name="filterTag" value="all">
        All
      </li>
      {tags.map((tag, index) => {
        return (
          <li
            key={index + 1}
            onClick={handleDropChange}
            name="filterTag"
            value={tag}
          >
            {tag}
          </li>
        );
      })}
    </ul>
  </>
);

export default FilterOptions;
