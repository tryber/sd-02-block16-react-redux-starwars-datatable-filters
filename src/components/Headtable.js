import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import orderAction from '../store/orderAction';

class Headtable extends Component {
  constructor(props) {
    super(props);
    this.setNewOrder = this.setNewOrder.bind(this);
  }

  setNewOrder(name, value) {
    const { setOrder, data, dataMock, dataMockFilter } = this.props;
    setOrder(data, dataMock, dataMockFilter, name, value);
  }

  render() {
    const { data, orderReducer } = this.props;
    let { filters: [{ order }] } = orderReducer;
    return (
      <thead>
        <tr>
          {Object.keys(data[0]).map((result) => ((result !== 'residents')
            ? <th
              className="headTable"
              key={result}
            >{result.replace(/_/g, ' ')}
              <button
                value={order !== 'ASC' ? 'DESC' : 'ASC'}
                onClick={(e) => this.setNewOrder(result, e.target.value)}
              >↓↑
              </button>
            </th>
            : null))
          }
        </tr>
      </thead>
    );
  }
}

const mapStateToProps = ({ loadReducer: { data, dataMock, dataMockFilter }, orderReducer }) =>
  ({ data, orderReducer, dataMock, dataMockFilter });

const mapDispatchToProps = (dispatch) => ({
  setOrder: (data, dataMock, dataMockFilter, name, order) =>
    dispatch(orderAction(data, dataMock, dataMockFilter, name, order)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Headtable);

Headtable.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  dataMock: PropTypes.instanceOf(Object).isRequired,
  dataMockFilter: PropTypes.instanceOf(Object).isRequired,
  orderReducer: PropTypes.instanceOf(Object).isRequired,
  setOrder: PropTypes.func.isRequired,
};
