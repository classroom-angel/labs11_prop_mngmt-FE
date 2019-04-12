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
    {/* <div style={{ display: 'inline-block', margin: '25px' }} /> */}
    <button
      className="dropdown-trigger btn cyan darken-4"
      data-target="dropdown2"
    >
      Tags
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
