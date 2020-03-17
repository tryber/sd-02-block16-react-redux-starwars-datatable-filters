import React, { Component } from 'react';

class SelectDropDown extends Component {

  render() {
    return (
      <form>
        <label htmlFor="filterType">
          <select
            id="filterType"
            onClick={(e) =>
            console.log(e.target.options[e.target.selectedIndex].text)}
          >
            <option value="1">population</option>
            <option value="2">orbital_period</option>
            <option value="3">diameter</option>
            <option value="4">rotation_period</option>
            <option value="5">surface_water</option>
          </select>
        </label>
      </form>
    );
  }
}

export default SelectDropDown;
