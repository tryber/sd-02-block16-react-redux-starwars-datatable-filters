import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import resultAPI from '../store/actions';


class Table extends Component {

  componentDidMount() {
    const { dataAPI } = this.props;
    dataAPI();
  }

  headTable(results) {
    return (
      <thead>
        <tr>
          {Object.keys(results[0]).map((result) => ((result !== 'residents')
            ? <th className="tableHeader" key={result}>{result}</th>
            : null))
          }
        </tr>
      </thead>
    );
  }

  render() {
    const { state: { reducer: { data: {results: results }, onSelection } } } = this.props;
    if (!onSelection) return <p>Loading...</p>
    return (
      <div>
        <p>A esquerda </p>
        <input />
        <div>StarWars Datatable with Filters</div>
        <table>
          {this.headTable(results)}
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { state };
}

const mapDispatchToProps = (dispatch) => ({
  dataAPI: () => dispatch(resultAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

Table.propTypes = {
  dataAPI: PropTypes.func.isRequired,
};
