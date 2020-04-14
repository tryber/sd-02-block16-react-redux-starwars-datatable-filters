import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import '../styles/Table.css';

class TableHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: '▲',
      ascDesc: 'ASC',
    };
  }

  changeOrder(...string) {
    this.setState({
      order: string[0],
      ascDesc: string[1],
    });
  }

  render() {
    const { headerData, sort } = this.props;
    console.log(sort);
    const { order, ascDesc } = this.state;
    console.log(order, ascDesc);
    return (
      <thead>
        <tr>
          {headerData.map((title) => (
            <th key={title}>
              {title}
              <button
                type="button"
                disabled={sort}
                onClick={() => (order === '▲'
                  ? this.changeOrder('▼', 'DESC', title)
                  : this.changeOrder('▲', 'ASC', title)
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
};

const mapStateToProps = ({
  allReducer: {
    sort,
  },
}) => ({
  sort,
});

// const mapDispatchToProps = (dispatch) => ({
//   sortData: dispatch(orderedPlanets())
// });

export default connect(mapStateToProps, null)(TableHeader);

// export default TableHeader;
