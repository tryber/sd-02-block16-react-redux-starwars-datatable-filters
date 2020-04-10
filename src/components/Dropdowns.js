import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import {
  filterColumns,
  filterComparison,
  filterNumber,
  generateFilter,
} from '../actions/dropdownActions';

class Dropdowns extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newNumericValues: {
        numericValues: {
          column: '',
          comparison: '',
          value: '',
        },
      },
    };
    this.storeFilters = this.storeFilters.bind(this);
    this.setColumnsState = this.setColumnsState.bind(this);
    this.setValueState = this.setValueState.bind(this);
  }

  setColumnsState(e) {
    const { filterBycolumn } = this.props;
    const { newNumericValues } = this.state;
    this.setState({
      newNumericValues: {
        ...newNumericValues,
        numericValues: {
          ...newNumericValues.numericValues,
          column: e.target.value,
        },
      },
    });
    filterBycolumn(e.target.value);
  }

  setComparisonState(e) {
    const { filterByComparison } = this.props;
    const { newNumericValues } = this.state;
    this.setState({
      newNumericValues: {
        ...newNumericValues,
        numericValues: {
          ...newNumericValues.numericValues,
          comparison: e.target.value,
        },
      },
    });
    filterByComparison(e.target.value);
  }

  setValueState(e) {
    const { filterByNumber } = this.props;
    const { newNumericValues } = this.state;
    this.setState({
      newNumericValues: {
        ...newNumericValues,
        numericValues: {
          ...newNumericValues.numericValues,
          value: e.target.value,
        },
      },
    });
    filterByNumber(e.target.value);
  }

  generateColumns(arr) {
    console.log(arr);
    return (
      <select onClick={(e) => this.setColumnsState(e)}>
        <option>Select Column</option>
        {arr.map((option) => <option key={option} name="column" value={option}>{option}</option>)}
      </select>
    );
  }

  generateComparison() {
    const comparison = ['more than', 'equal to', 'less than'];
    return (
      <select onChange={(e) => this.setComparisonState(e)}>
        <option value="">Select Comparison</option>
        {comparison.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    );
  }

  storeFilters() {
    const { actionStoreFilters, columns } = this.props;
    const { newNumericValues } = this.state;
    return columns.length > 0 && actionStoreFilters(newNumericValues);
  }

  render() {
    const {
      columns,
    } = this.props;
    return (
      <div>
        {this.generateColumns(columns)}
        {this.generateComparison()}
        <input
          type="number"
          placeholder="type a number here!"
          onChange={(e) => this.setValueState(e)}
        />
        <button type="button" onClick={() => this.storeFilters()}>Filter!</button>
      </div>
    );
  }
}

const mapStateToProps = ({
  dropdownReducer: {
    columns,
    column,
    comparison,
    value,
  },
}) => ({
  columns,
  column,
  comparison,
  value,
});

const mapDispatchToProps = (dispatch) => ({
  filterBycolumn: (column) => dispatch(filterColumns(column)),
  filterByComparison: (comparison) => dispatch(filterComparison(comparison)),
  filterByNumber: (value) => dispatch(filterNumber(value)),
  actionStoreFilters: (newNumericValues) => dispatch(generateFilter(newNumericValues)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dropdowns);

Dropdowns.propTypes = {
  filterBycolumn: propTypes.func.isRequired,
  filterByComparison: propTypes.func.isRequired,
  filterByNumber: propTypes.func.isRequired,
  columns: propTypes.arrayOf(propTypes.string).isRequired,
};
