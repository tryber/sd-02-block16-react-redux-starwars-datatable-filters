import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      column: '',
      comparison: '',
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { value, name } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit() {
    return '';
  }

  render() {
    const isBlank = Object.values(this.state).some((value) => value === '');

    const columns = ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
    return (
      <div>
        <select name="column" onChange={(e) => this.handleChange(e)}>
          {columns.map((item) => <option value={item} key={item}>{item}</option>)}
        </select>
        <select name="comparison" onChange={(e) => this.handleChange(e)}>
          <option value="maior que">Maior que</option>
          <option value="menor que">Menor que</option>
          <option value="igual a">Igual a</option>
        </select>
        <input name="value" type="number" onChange={(e) => this.handleChange(e)} />
        <button disabled={isBlank} type="button" onClick={this.handleSubmit}>Pesquisar</button>
      </div>
    );
  }
}

// const mapDispatchToProps = (dispatch) => ({
//   createPlanets: (results) => dispatch(addPlanets(results)),
//   filterPlanets: (name) => dispatch(filterNames(name)),
// });

// const mapStateToProps = ({ reducerData: { data, wasFetched }, reducerNames: { filters } }) => ({
//   data, wasFetched, filters,
// });

// Table.propTypes = {
//   createPlanets: PropTypes.func.isRequired,
//   filterPlanets: PropTypes.func.isRequired,
//   data: PropTypes.instanceOf(Array),
//   wasFetched: PropTypes.bool.isRequired,
//   filters: PropTypes.instanceOf(Array),
// };

// Table.defaultProps = {
//   data: [],
//   filters: [],
// };

export default connect()(Dropdown);
