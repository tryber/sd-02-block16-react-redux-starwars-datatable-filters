import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import addFilters from '../store/actions/addFilters';
import removeFilter from '../store/actions/removeFilter';


class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      column: '',
      comparison: '',
      value: '',
      options: ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleChange(e) {
    const { value, name } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit() {
    const { createFilters } = this.props;
    this.setState((state) => ({
      options: state.options.filter((option) => option !== state.column),
    }));
    createFilters(this.state);
  }

  handleRemove(index, column) {
    const { removeFilters } = this.props;
    const { options } = this.state;
    const newOptions = options;
    newOptions.push(`${column}`);
    this.setState(() => ({
      options: newOptions,
    }));
    removeFilters(index);
  }

  render() {
    const isBlank = Object.values(this.state).some((value) => value === '');
    const { filters } = this.props;
    const {
      options,
    } = this.state;
    return (
      <div>
        <select name="column" onChange={(e) => this.handleChange(e)}>
          <option value=""> </option>
          {options.map((item) => <option value={item} key={item}>{item}</option>)}
        </select>
        <select name="comparison" onChange={(e) => this.handleChange(e)}>
          <option value=""> </option>
          <option value="maior que">Maior que</option>
          <option value="menor que">Menor que</option>
          <option value="igual a">Igual a</option>
        </select>
        <input name="value" type="number" onChange={(e) => this.handleChange(e)} />
        <button disabled={isBlank} type="button" onClick={this.handleSubmit}>Pesquisar</button>
        <div>
          {filters.map(({ numericValues: { column, comparison, value } }, index) => (
            <div>
              <p>
              Filtro aplicado:
                {' '}
                {column}
                {' '}
|
                {' '}
                {' '}
                {comparison}
                {' '}
|
                {value}
              </p>
              <button type="button" onClick={() => this.handleRemove(index, column)}>X</button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  createFilters: (filters) => dispatch(addFilters(filters)),
  removeFilters: (index) => dispatch(removeFilter(index)),
});

const mapStateToProps = ({ reducerNumbers: { filters } }) => ({
  filters,
});

Dropdown.propTypes = {
  createFilters: PropTypes.func.isRequired,
  removeFilters: PropTypes.func.isRequired,
  filters: PropTypes.instanceOf(Array),
};

Dropdown.defaultProps = {
  filters: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(Dropdown);
