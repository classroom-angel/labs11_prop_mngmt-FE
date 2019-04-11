import React from 'react';

const FilterOptions = ({ handleDropChange, statuses, tags }) => (
  <>
    Filter By Status:
    {/*Dropdown Trigger */}
    <button className="dropdown-trigger btn" data-target="dropdown1">
      Choose
    </button>
    {/* Dropdown Structure */}
    <ul id="dropdown1" className="dropdown-content">
      <li key={0} onClick={handleDropChange}>
        <p name="filterStatus" value="all">
          All
        </p>
      </li>
      {statuses.map((status, index) => {
        return (
          <li key={index + 1} onClick={handleDropChange}>
            <p name="filterStatus" value={status}>
              {status}
            </p>
          </li>
        );
      })}
    </ul>
    Filter By Tag:
    <button className="dropdown-trigger btn" data-target="dropdown2">
      Choose
    </button>
    {/* Dropdown Structure */}
    <ul id="dropdown2" className="dropdown-content">
      {tags.map((tag, index) => {
        return (
          <li key={index} value={tag}>
            <p>{tag}</p>
          </li>
        );
      })}
    </ul>
  </>
);

export default FilterOptions;
