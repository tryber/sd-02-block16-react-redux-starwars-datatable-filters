import React from 'react';

class Select extends React.Component {
  render() {
    const columns = ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
    return (
      <section>
        <select onChange={(e) => console.log(e.target.value)}>
          <option value="" label="Escolha uma coluna" selected="selected" />
          {columns.map((item) => <option value={item} key={item}>{item}</option>)}
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
