import React from 'react';
import { connect } from 'react-redux';
import { filterPlanetsWithName } from '../actions';


class Input extends React.Component {
  render() {
    const { planetsData, dispatchFilterName } = this.props;
    return (
      <div>
        <input
          type="text"
          onChange={(userInfo) => dispatchFilterName(planetsData, userInfo.target.value)}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchFilterName: (planetsData, userInfo) => (
    dispatch(filterPlanetsWithName(planetsData, userInfo))
  ),
});

export default connect(null, mapDispatchToProps)(Input);
