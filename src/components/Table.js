import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import apiReturn from '../actions';
import Loading from './Loading';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import InputsAndFilters from './InputsAndFilters';
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
    } = this.props;

    if (isFetching) {
      return <Loading />;
    }

    const haveFilters = numericValues.length > 0
      ? filterReturn(numericValues, filteredData)
      : filteredData;

    return (
      <div className="allTable">
        <InputsAndFilters
          planetsData={planetsData}
          filteredData={filteredData}
        />
        <table>
          {TableHeader(tableTitle)}
          {TableBody(haveFilters)}
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
    },
  },
) => ({
  filters,
  isFetching,
  planetsData,
  filteredData,
  numericValues,
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
};

Table.defaultProps = {
  planetsData: [],
  filteredData: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
