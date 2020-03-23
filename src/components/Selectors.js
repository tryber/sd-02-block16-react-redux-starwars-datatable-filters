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
    // this.deleteClick = this.deleteClick.bind(this);
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

  // deleteClick(event) {
  //   const { name } = event.target;
  //   const { data, filters, deleteFilter } = this.props;

  //   deleteFilter(data, name, filters);
  // }

  renderColumnSelector() {
    const columns = ['rotation_period', 'orbital_period', 'diameter', 'surface_water', 'population'];
    const { filters } = this.props;
    const selectedColumn = filters.map((el) => (
      el.numericValues ? el.numericValues.column : false));
    return (
      <div>
        <span className="selector-label">Choose a column:</span>
        <select name="column" onChange={this.onChangeHandler} required>
          <option value="" label=" " />
          {columns.map((element) => (
            selectedColumn.includes(element)
              ? false
              : <option value={element}>{element.replace('_', ' ')}</option>
          ))}
        </select>
      </div>
    );
  }

  renderFilterButton() {
    const { column, comparison, value } = this.state;
    return (
      column && comparison && value
        ? <input type="reset" value="Filtrar" onClick={this.onClickHandler} />
        : false
    );
  }

  renderFilters() {
    const { filters } = this.props;
    const [, ...rest] = filters;
    // if (rest.length) {

    // }
    return (
      <section>
        {rest.map(({ numericValues: { column, comparison, value } }) => (
          <div className="column-filters">
            <p className="column-filter" name={column}>{`☉ ${column.replace('_', ' ')} ${comparison.toLowerCase()} ${value}`}</p>
            {/* <button type="button" name={column} onClick={this.deleteClick}>X</button> */}
          </div>
        ))}
      </section>
    );
    // return false;
  }

  render() {
    return (
      <div>
        <form>
          {this.renderColumnSelector()}
          <div>
            <span className="selector-label">Choose a comparison:</span>
            <select name="comparison" onChange={this.onChangeHandler} required>
              <option value="" label=" " />
              <option value="Maior que">Maior que</option>
              <option value="Menor que">Menor que</option>
              <option value="Igual a">Igual a</option>
            </select>
          </div>
          <div className="group number-selector">
            <input
              type="number"
              name="value"
              onChange={this.onChangeHandler}
              required
              id="number-bar"
            />
            <span className="highlight" />
            <span className="bar" />
            <label htmlFor="number-bar">Type a number</label>
          </div>
        </form>
        {this.renderFilterButton()}
        {this.renderFilters()}
      </div>
    );
  }
}

Selectors.propTypes = {
  filterPlanetsByColumn: PropTypes.func.isRequired,
  // deleteFilter: PropTypes.func.isRequired,
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
  // deleteFilter: (data, column, filters) => dispatch(deleteFilters(data, column, filters)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Selectors);
