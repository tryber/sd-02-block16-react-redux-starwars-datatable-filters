import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import resultAPI from '../store/actions';
import './Table.css';

const cellTable = (results) => {
  return (
    results.map((result) => (
      <tbody key={result.name}>
        <tr>
          {Object.values(result).map((item, index) => {
            if (index !== 9) {
              return (
                <td key={item}>{item}</td>
              );
            }
            return null;
          })}
        </tr>
      </tbody>
    ))
  );
}

const headTable = (results) => {
  return (
    <thead>
      <tr>
        {Object.keys(results[0]).map((result) => ((result !== 'residents')
          ? <th className="headTable" key={result}>{result.replace(/_/g, ' ')}</th>
          : null))
        }
      </tr>
    </thead>
  );
}

class Table extends Component {

  componentDidMount() {
    const { dataAPI } = this.props;
    dataAPI();
  }

  render() {
    const { state: { reducer: { data: { results }, onSelection } } } = this.props;
    if (!onSelection) return <p>Loading...</p>;
    return (
      <div>
        <input type="text" />
        <div>StarWars DataTable with Filters</div>
        <table>
          {headTable(results)}
          {cellTable(results)}
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
  state: PropTypes.object.isRequired,
};
