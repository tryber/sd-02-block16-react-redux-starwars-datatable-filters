import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { filterByColumn } from '../actions/filterPlanets';
import './Selectors.css';


class Selectors extends Component {
  constructor(props) {
    super(props);

    this.state = {
      column: '',
      comparison: '',
      value: '',
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onChangeHandler(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  onClickHandler() {
    const { filterPlanetsByColumn, data, filters, filteredData } = this.props;
    const { column, comparison, value } = this.state;
    filterPlanetsByColumn(filters[0].name, data, column, comparison, value, filters, filteredData);
  }

  renderFilters() {
    const { filters } = this.props;
    const [, ...rest] = filters;
    return (
      <section>
        {rest.map(({ numericValues: { column, comparison, value } }) => (
          <div className="column-filters">
            <p className="column-filter">{`${column.replace('_', ' ')} ${comparison.toLowerCase()} ${value}`}</p>
            <button type="button">X</button>
          </div>
        ))}
      </section>
    );
  }

  render() {
    const columns = ['rotation_period', 'orbital_period', 'diameter', 'surface_water', 'population'];
    const { filters } = this.props;
    const { column, comparison, value } = this.state;
    const selectedColumn = filters.map((el) => (
      el.numericValues ? el.numericValues.column : false));
    return (
      <form>
        <select name="column" onChange={this.onChangeHandler} required>
          <option value="" label=" " />
          {columns.map((element) => (
            selectedColumn.includes(element)
              ? false
              : <option value={element}>{element.replace('_', ' ')}</option>
          ))}
        </select>
        <select name="comparison" onChange={this.onChangeHandler} required>
          <option value="" label=" " />
          <option value="Maior que">Maior que</option>
          <option value="Menor que">Menor que</option>
          <option value="Igual a">Igual a</option>
        </select>
        <input type="number" name="value" onChange={this.onChangeHandler} required />
        {
          column && comparison && value
            ? <input type="reset" value="Filtrar" onClick={this.onClickHandler} />
            : false
        }
        {this.renderFilters()}
      </form>
    );
  }
}

Selectors.propTypes = {
  filterPlanetsByColumn: PropTypes.func.isRequired,
  data: PropTypes.instanceOf(Array).isRequired,
  filters: PropTypes.instanceOf(Array),
  filteredData: PropTypes.instanceOf(Array),
};

Selectors.defaultProps = {
  filters: [],
  filteredData: [],
};

const mapStateToProps = ({
  planetsData: { data },
  planetsFilters: {
    filteredData,
    filters,
  },
}) => ({
  data,
  filteredData,
  filters,
});

const mapDispatchToProps = (dispatch) => ({
  filterPlanetsByColumn: (
    name,
    data,
    column,
    comparison,
    value,
    filters,
    filteredData,
  ) => dispatch(filterByColumn(name, data, column, comparison, value, filters, filteredData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Selectors);
