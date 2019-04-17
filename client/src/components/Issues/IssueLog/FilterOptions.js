import React from 'react';

const FilterOptions = ({ handleDropChange, statuses, tags, visitChange }) => (
  <>
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
    <ul id="dropdown3" className="dropdown-content">
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
    <ul id="dropdown4" className="dropdown-content">
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
