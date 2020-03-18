import React from 'react';

class Select extends React.Component {
  render() {
    return (
      <section>
        <select onChange={(e) => console.log(e.target.value)}>
          <option value="" label="Escolha uma coluna" selected="selected" />
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <select onChange={(e) => console.log(e.target.value)}>
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
