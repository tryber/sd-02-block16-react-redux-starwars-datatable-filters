import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import resultAPI from '../store/actions';
import './Table.css';


class Table extends Component {
  constructor(props) {
    super(props);
    this.headTable = this.headTable.bind(this);
    this.cellTable = this.cellTable.bind(this);
  }

  componentDidMount() {
    const { dataAPI } = this.props;
    dataAPI();
  }

  headTable(results) {
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

  cellTable(results) {
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

  render() {
    const { state: { reducer: { data: { results }, onSelection } } } = this.props;
    if (!onSelection) return <p>Loading...</p>;
    return (
      <div>
        <input type="text" />
        <div>StarWars Datatable with Filters</div>
        <table>
          {this.headTable(results)}
          {this.cellTable(results)}
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
