import React from 'react';
import PropTypes from 'prop-types';
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
  filters.map((filter) => console.log(filter));
};

class Table extends React.Component {
  componentDidMount() {
    const { initialRequisition } = this.props;
    initialRequisition();
  }

  render() {
    const {
      filters,
      planetsData,
      isFetching,
      filteredData,
    } = this.props;
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
      filtersToShow,
      filters,
    },
  },
) => ({
  filters,
  isFetching,
  planetsData,
  filteredData,
  filtersToShow,
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
  filtersToShow: PropTypes.arrayOf(PropTypes.object).isRequired,
  initialRequisition: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

Table.defaultProps = {
  planetsData: [],
  filteredData: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
