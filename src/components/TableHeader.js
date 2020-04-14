import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { orderedPlanets } from '../actions';
import '../styles/Table.css';

class TableHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: '▲',
      ascDesc: 'ASC',
    };
  }

  changeOrder(icon, order, column, sortData) {
    const prevState = this.state;
    sortData(column, prevState.ascDesc);
    this.setState({
      order: icon,
      ascDesc: order,
    });
  }

  render() {
    const { headerData, sorted, sortData } = this.props;
    const { order } = this.state;
    return (
      <thead>
        <tr>
          {headerData.map((title) => (
            <th key={title}>
              {title}
              <button
                type="button"
                disabled={sorted.column}
                onClick={() => (order === '▲'
                  ? this.changeOrder('▼', 'DESC', title, sortData)
                  : this.changeOrder('▲', 'ASC', title, sortData)
                )}
              >
                {order}
              </button>
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

TableHeader.propTypes = {
  headerData: propTypes.arrayOf(propTypes.string).isRequired,
  sorted: propTypes.objectOf(propTypes.string).isRequired,
  sortData: propTypes.func.isRequired,
};

const mapStateToProps = ({
  allReducer: {
    sorted,
  },
}) => ({
  sorted,
});

const mapDispatchToProps = (dispatch) => ({
  sortData: (column, ascDesc) => dispatch(orderedPlanets(column, ascDesc)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableHeader);
