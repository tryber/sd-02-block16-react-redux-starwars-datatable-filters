import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Dropdown from './Dropdown';
import './filterBy.css';

function actionAsc(e, order) {
  return {
    type: 'Order',
    order: {
      ...order,
      asc: e.target.outerText,
    },
  };
}

function actionName(e, order) {
  return {
    type: 'Order',
    order: {
      ...order,
      name: e.target.outerText,
    },
  };
}

function handleClick(event) {
  actionName(event);
}

class Order extends Component {
  constructor(props) {
    super(props);
    this.dropdown = React.createRef();
  }

  render() {
    const {
      handle, planets, order
    } = this.props;
    return (
      <div className="comp_order">
        <div>
          <p>Order</p>
          <button type="button" onClick={(e) => handle(e, order)}>Asc</button>
          <button type="button" onClick={(e) => handle(e, order)}>Desc</button>
        </div>
        <Dropdown
          options={Object.keys(planets[0])}
          cb={handleClick}
        />
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  order: state.filter.order,
  planets: state.data.planets,
});

const mapDispatchToProps = (dispatch) => ({
  handle: (e) => dispatch(actionAsc(e)),
});

Order.propTypes = {
  handle: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
