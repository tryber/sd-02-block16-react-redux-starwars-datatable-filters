import React from 'react';
import PropTypes, { array } from 'prop-types';
import { connect } from 'react-redux';
import apiReturn from '../actions';
import Loading from './Loading';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import ReturnFilters from './ReturnFilters';
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

const allFilters = (filters, planetsData) => {
  let arrayReturn = planetsData;
  filters.forEach((filter) => {
    // console.log(filter);
    if (filter.numericValues) {
      const { comparison, column, value } = filter.numericValues;
      console.log(comparison, column, value);
      switch (comparison) {
        case 'bigger_than':
          arrayReturn = arrayReturn.filter((planet) => (
            Number(planet[column]) > Number(value)
          ));
          console.log(arrayReturn);
          return arrayReturn;
        case 'less_than':
          arrayReturn = arrayReturn.filter((planet) => (
            Number(planet[column]) < Number(value)
          ));
          console.log(arrayReturn);
          return arrayReturn;
        case 'equal_to':
          arrayReturn = arrayReturn.filter((planet) => (
            Number(planet[column]) === Number(value)
          ));
          console.log(arrayReturn);
          return arrayReturn;
        default: return planetsData;
      }
    }
    return arrayReturn;
  });
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
      filters,
    } = this.props;
    console.log(allFilters(filters, planetsData));
    if (isFetching) {
      return <Loading />;
    }
    return (
      <div className="allTable">
        <InputsAndFilters
          planetsData={planetsData}
          filteredData={filteredData}
        />

        <ReturnFilters />

        <table>
          {TableHeader(tableTitle)}
          {TableBody(filteredData)}
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
    },
  },
) => ({
  filters,
  isFetching,
  planetsData,
  filteredData,
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
};

Table.defaultProps = {
  planetsData: [],
  filteredData: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
