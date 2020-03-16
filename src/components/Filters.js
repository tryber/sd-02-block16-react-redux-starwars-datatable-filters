import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addFilters } from '../actions';
import ActiveFilters from './ActiveFilters';
import NameFilterInput from './NameFilterInput';
import ColumnFilterSelect from './ColumnFilterSelect';
import ComparisonFilterSelect from './ComparisonFilterSelect';
import ValueFilterInput from './ValueFilterInput';

class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      column: '',
      comparison: '',
      value: '',
    };
    this.filterColumn = this.filterColumn.bind(this);
    this.filterComparison = this.filterComparison.bind(this);
    this.filterValue = this.filterValue.bind(this);
    this.sendValues = this.sendValues.bind(this);
  }

  filterColumn(value) {
    this.setState({
      column: value,
    });
  }

  filterComparison(value) {
    this.setState({
      comparison: value,
    });
  }

  filterValue(value) {
    this.setState({
      value,
    });
  }

  sendValues() {
    const { column, comparison, value } = this.state;
    const { addPlanetFilters } = this.props;
    addPlanetFilters({ column, comparison, value });
    this.setState({
      column: '',
    });
  }

  render() {
    const { column, comparison, value } = this.state;
    return (
      <div>
        <ActiveFilters />
        <div className="filters">
          <NameFilterInput />
          Filtrar por Valores Numéricos
          <div className="filter-planets">
            <ColumnFilterSelect handleChange={this.filterColumn} />
            <ComparisonFilterSelect handleChange={this.filterComparison} />
            <ValueFilterInput handleChange={this.filterValue} />
            {column && comparison && value
            && <button type="button" onClick={() => this.sendValues()}>Adicionar Filtro</button>}
          </div>
        </div>
      </div>
    );
  }
}

Filters.propTypes = {
  addPlanetFilters: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addPlanetFilters: (value) => dispatch(addFilters(value)),
});

export default connect(null, mapDispatchToProps)(Filters);
