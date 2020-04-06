import React from 'react';

class Dropdowns extends React.Component {
  generateColumns() {
    console.log(this);
    const columns = ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
    return (
      <select>
        {columns.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    );
  }

  generateComparison() {
    console.log(this);
    const comparison = ['greater than', 'equal to', 'less than'];
    return (
      <select>
        {comparison.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    );
  }

  render() {
    return (
      <div>
        {this.generateColumns()}
        {this.generateComparison()}
        <input type="number" placeholder="type a number here!" />
      </div>
    );
  }
}

export default Dropdowns;
