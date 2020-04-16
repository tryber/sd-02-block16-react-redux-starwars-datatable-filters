import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import apiReturn from '../actions';
import Loading from './Loading';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import InputsAndFilters from './InputsAndFilters';
import ReturnFilters from './ReturnFilters';
import '../styles/Table.css';

const tableTitle = [
  'Name',
  'Rotation Period',
  'Orbital Period',
  'Diameter',
  'Climate',
  'Gravity',
  'Terrain',
  'Surface Water',
  'Population',
  'Films',
  'Created',
  'Edited',
  'URL',
];

// Terminar esse sort

const filterReturn = (numericValues, filteredData) => {
  let returnFiltered = filteredData;
  numericValues.forEach((filter) => {
    const { column, comparison, value } = filter;

    switch (comparison) {
      case 'bigger_than':
        returnFiltered = returnFiltered.filter((planet) => (
          Number(planet[column]) > Number(value)
        ));
        return returnFiltered;

      case 'less_than':
        returnFiltered = returnFiltered.filter((planet) => (
          Number(planet[column]) < Number(value)
        ));
        return returnFiltered;

      case 'equal_to':
        returnFiltered = returnFiltered.filter((planet) => (
          Number(planet[column]) === Number(value)
        ));
        return returnFiltered;

      default: return filteredData;
    }
  });
  return returnFiltered;
};

class Table extends React.Component {
  componentDidMount() {
    const { initialRequisition } = this.props;
    initialRequisition();
  }

  render() {
    const {
      planetsData,
      isFetching,
      filteredData,
      numericValues,
      sorted,
    } = this.props;

    if (isFetching) {
      return <Loading />;
    }

    const haveFilters = filterReturn(numericValues, filteredData, sorted);
    const arrayFilters = haveFilters ? [...haveFilters] : [];
    let isBigger = 0;
    const toTable = arrayFilters.length > 0 && sorted.column
      ? arrayFilters.sort((next, prev) => {
        const value = sorted.column.toLowerCase();
        const nextColumn = next[value].toLowerCase();
        const prevColumn = prev[value].toLowerCase();
        isBigger = nextColumn > prevColumn ? 1 : -1;
        console.log(sorted.order);
        return sorted.order === 'ASC'
          ? isBigger : isBigger * -1;
      })
      : arrayFilters;

    return (
      <div className="allTable">
        <InputsAndFilters
          planetsData={planetsData}
          filteredData={filteredData}
        />
        <ReturnFilters />
        <table>
          <TableHeader headerData={tableTitle} />
          {TableBody(toTable)}
        </table>
      </div>
    );
  }
}

const mapStateToProps = (
  {
    allReducer: {
      isFetching,
      planetsData,
      filteredData,
      filters,
      numericValues,
      sorted,
    },
  },
) => ({
  filters,
  isFetching,
  planetsData,
  filteredData,
  numericValues,
  sorted,
});

const mapDispatchToProps = (dispatch) => ({
  initialRequisition: () => dispatch(apiReturn()),
});

Table.propTypes = {
  planetsData: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  filteredData: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  initialRequisition: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  numericValues: PropTypes.arrayOf(PropTypes.object).isRequired,
  sorted: PropTypes.objectOf(PropTypes.string).isRequired,
};

Table.defaultProps = {
  planetsData: [],
  filteredData: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
