import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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

class Table extends React.Component {
  componentDidMount() {
    const { initialRequisition } = this.props;
    initialRequisition();
  }

  render() {
    const { planetsData, isFetching, filteredData } = this.props;
    const consumerData = filteredData || planetsData;
    if (isFetching) {
      return <Loading />;
    }
    return (
      <div className="allTable">
        <InputsAndFilters
          planetsData={consumerData}
          filteredData={consumerData}
        />
        <table>
          {TableHeader(tableTitle)}
          {TableBody(consumerData)}
        </table>
      </div>
    );
  }
}

const mapStateToProps = (
  {
    returnInitialAPI: { isFetching, planetsData },
    returnFilterData: { filteredData },
  },
) => ({
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
