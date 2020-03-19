import * as types from './actionTypes';
import { connect } from 'react-redux';

function updateFilters(column, condition, value) {
  return {
    type: types.RESULT_FILTER_TYPE,
    numericValues: {
      column,
      condition,
      value,
    }
  };
}

const dispatchFilters = (column, condition, value) => (
  (dispatch) => {
    const { dataMock } = this.props;
    console.log(dataMock)
    //return dispatch(updateFilters(column, condition, value));
  }
);

const mapStateToProps = ({ loadReducer: { dataMock } }) => ({ dataMock });

export default connect(mapStateToProps)(dispatchFilters);
