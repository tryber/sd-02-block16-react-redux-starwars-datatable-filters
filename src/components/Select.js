import React from 'react';

class Select extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectValues: {
        name: '',
        column: '',
        comparison: '',
        value: 0,
      }
    };
  }

  render() {
    return (
      <section>
        <select>
          <option value="" label=" " selected="selected" />
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <select>
          <option value="Maior que" selected="selected">Maior que</option>
          <option value="Menor que">Menor que</option>
          <option value="Igual a">Igual a</option>
        </select>
        <input type="number" />
        <button type="button">X</button>
        <button type="button">Filtrar</button>
      </section>
    );
  }
}

export default Select;
