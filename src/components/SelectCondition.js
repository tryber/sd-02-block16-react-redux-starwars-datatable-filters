import React, { Component } from 'react';

class SelectCondition extends Component {

  render() {
    return (
      <form>
        <label>
          <select onClick={(e) => console.log(e.target.options[e.target.selectedIndex].text)}>
            <option value='1'>Maior que</option>
            <option value='2'>Menor que</option>
            <option value='3'>Igual a</option>
          </select>
        </label>
      </form>
    );
  }
}

export default SelectCondition;
