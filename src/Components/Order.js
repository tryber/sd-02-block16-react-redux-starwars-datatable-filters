import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  planetsPropTypes,
  planetsDefault,
  filtersPropTypes,
  filtersDefault,
} from './PropTypes';
import Dropdown from './Dropdown';
import './filterBy.css';


function actionAsc(e, filters) {
  const coisa = [...filters];
  coisa[1].order = e.target.outerText;
  return {
    type: 'Order',
    filters: coisa,
  };
}

class Order extends Component {
  constructor(props) {
    super(props);
    this.dropdown = React.createRef();
  }

  render() {
    const {
      handle, planets, filters,
    } = this.props;
    return (
      <div className="comp_order">
        <div>
          <p>Order</p>
          <button type="button" onClick={(e) => handle(e, filters)}>ASC</button>
          <button type="button" onClick={(e) => handle(e, filters)}>DESC</button>
        </div>
        <Dropdown
          options={Object.keys(planets[0])} initSelect="name"
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  filters: state.filter.filters,
  planets: state.data.planets,
});

const mapDispatchToProps = (dispatch) => ({
  handle: (e, filters) => dispatch(actionAsc(e, filters)),
});

Order.propTypes = {
  handle: PropTypes.func.isRequired,
  planets: planetsPropTypes.planets,
  filters: filtersPropTypes.filters,
};

Order.defaultProps = {
  planets: planetsDefault,
  filters: filtersDefault,
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
