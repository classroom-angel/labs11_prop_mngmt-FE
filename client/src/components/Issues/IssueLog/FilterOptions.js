import React from 'react';

const FilterOptions = ({ handleChange, statuses, tags }) => (
  <>
    Filter By Status:
    <select
      name="filterStatus"
      onChange={handleChange}
      className=""
      style={{ marginBottom: '20px' }}
    >
      <option value="all">Choose...</option>
      {statuses.map((status, index) => {
        return (
          <option key={index} value={status}>
            {status}
          </option>
        );
      })}
    </select>
    Filter By Tag:
    <select
      name="filterTag"
      onChange={handleChange}
      className=""
      style={{ marginBottom: '20px' }}
    >
      <option value="all">Choose...</option>
      {tags.map((tag, index) => {
        return (
          <option key={index} value={tag}>
            {tag}
          </option>
        );
      })}
    </select>
  </>
);

export default FilterOptions;
