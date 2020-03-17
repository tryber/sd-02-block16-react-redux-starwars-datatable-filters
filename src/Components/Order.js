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

class Order extends Component {
  constructor(props) {
    super(props);
    this.dropdown = React.createRef();
  }

  render() {
    const {
      handle, planets, order,
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
  handle: (e, order) => dispatch(actionAsc(e, order)),
});

Order.propTypes = {
  handle: PropTypes.func.isRequired,
  planets: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      rotation_period: PropTypes.string,
      orbital_period: PropTypes.string,
      diameter: PropTypes.string,
      surface_water: PropTypes.string,
      climate: PropTypes.string,
      gravity: PropTypes.string,
      terrain: PropTypes.string,
      populatio: PropTypes.string,
      created: PropTypes.string,
      edited: PropTypes.string,
      url: PropTypes.string,
      films: PropTypes.arrayOf(
        PropTypes.string,
      ),
    }),
  ),
  order: PropTypes.shape({
    name: PropTypes.string,
    asc: PropTypes.string,
  }),
};

Order.defaultProps = {
  planets: [{
    name: '',
    rotation_period: null,
    orbital_period: null,
    diameter: null,
    surface_water: '',
    climate: '',
    gravity: '',
    terrain: '',
    populatio: '',
    created: '',
    edited: '',
    url: '',
    films: PropTypes.arrayOf(
      '',
    ),
  }],
  order: {
    name: '',
    asc: '',
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
