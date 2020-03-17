import React, { Component } from 'react';

class SelectCondition extends Component {

  render() {
    return (
      <form>
        <label htmlFor="conditionType">
          <select id="conditionType" onClick={(e) =>
            console.log(e.target.options[e.target.selectedIndex].text)}
          >
            <option value="6">Maior que</option>
            <option value="7">Menor que</option>
            <option value="8">Igual a</option>
          </select>
        </label>
      </form>
    );
  }
}

export default SelectCondition;
