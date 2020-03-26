import React from 'react';

class TableFilters extends React.Component {
  constructor(props) {
    super(props);
    const dropdownColumn = ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
    const dropdownComparison = ['maior que', 'menor que', 'igual a'];

    this.state = {
      dropdown: {
        dropdownColumn,
        dropdownComparison,
      },
      name: '',
      column: '',
      comparison: '',
      value: 0,
    };

    this.setInputNameField = this.setInputNameField.bind(this);
  }

  setInputNameField(name) {
    this.setState({ name });
  }

  inputFilter() {
    const { name } = this.state;
    return (
      <input
        type="text"
        placeholder="Digite um nome"
        value={name}
        onChange={(e) => this.setInputNameField(e.target.value)}
      />
    );
  }

  selectingColumn() {
    const { dropDownColumn } = this.state;
    return (
      <select>
        {dropDownColumn.map((column) => <option key={column} value={column}>{column}</option>)}
      </select>
    );
  }

  selectingComparison() {
    const { dropDownComparison } = this.state;
    return (
      <select>
        {dropDownComparison.map((comparison) => <option key={comparison} value={comparison}>{comparison}</option>)}
      </select>
    );
  }

  renderNumberInput() {
    return (
      <input
        type="number"
        placeholder="Digite um valor numérico"
      />
    );
  }
  render() {
    return (
      <div>
        {this.inputFilter()}
        {this.selectingColumn()}
        {this.selectingComparison()}
        {this.renderNumberInput()}
      </div>
    );
  }
}


export default TableFilters;
