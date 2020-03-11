import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class NumberFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      column: '',
      comparison: '',
      value: '',
    };
    this.selectAndInput = this.selectAndInput.bind(this);
    this.select = this.select.bind(this);
  }

  select(arrayFilter) {
    return (
      <select onChange={({ target: { value } }) => this.setState({ column: value })}>
        <option>{null}</option>
        {arrayFilter.map((ele) => <option key={ele} value={ele}>{ele}</option>)}
      </select>
    );
  }

  selectAndInput() {
    const { column, comparison } = this.state;
    return (
      <div>
        <select
          disabled={(column) ? false : !false}
          onChange={({ target: { value } }) => this.setState({ comparison: value })}
        >
          <option>{null}</option>
          <option value="Maior que">Maior que</option>
          <option value="Menor que">Menor que</option>
          <option value="Igual a">Igual a</option>
        </select>
        <input
          disabled={(comparison) ? false : !false}
          onChange={({ target: { value } }) => this.setState({ value })}
          type="number"
        />
      </div>
    );
  }

  render() {
    const { filtred } = this.props;
    const { comparison } = this.state;
    const arrayFilter = ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
    return (
      <div>
        {this.select(arrayFilter)}
        {this.selectAndInput()}
        <button
          onClick={() => filtred(this.state)}
          type="button"
          disabled={(comparison) ? false : !false}
        >
          Filtrar
        </button>
      </div>
    );
  }
}

// const mapStateToProps = () => ({ null });

const mapDispatchToProps = (dispatch) => ({
  filtred: (obj) => dispatch({ type: 'FilterNumber', obj }),
});

export default connect(null, mapDispatchToProps)(NumberFilter);

NumberFilter.propTypes = {
  filtredName: PropTypes.func,
}.isRequired;
