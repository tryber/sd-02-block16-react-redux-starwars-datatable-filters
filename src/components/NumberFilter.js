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
  }

  selectAndInput(filtred) {
    const { column, comparison } = this.state;
    return (
      <div>
        <select
          disabled={(column) ? false : !false}
          onChange={({ target: { value } }) => this.setState({ comparison: value })}
        >
          <option> </option>
          <option value="Maior que">Maior que</option>
          <option value="Menor que">Menor que</option>
          <option value="Igual a">Igual a</option>
        </select>
        <input
          disabled={(comparison) ? false : !false}
          onChange={({ target: { value } }) => this.setState({ value })}
          type="number"
        />
        <button onClick={() => filtred(this.state)} type="button">Filtrar</button>
      </div>
    );
  }

  render() {
    const { filtred } = this.props;
    const arrayFilter = ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
    return (
      <div>
        <select onChange={({ target: { value } }) => this.setState({ column: value })}>
          <option> </option>
          {arrayFilter.map((ele) => <option key={ele} value={ele}>{ele}</option>)}
        </select>
        {this.selectAndInput(filtred)}
      </div>
    );
  }
}

const mapStateToProps = ({ filters }) => ({ filters });

const mapDispatchToProps = (dispatch) => ({
  filtred: (obj) => dispatch({ type: 'FilterNumber', obj }),
});

export default connect(mapStateToProps, mapDispatchToProps)(NumberFilter);

NumberFilter.propTypes = {
  filtredName: PropTypes.func,
}.isRequired;
