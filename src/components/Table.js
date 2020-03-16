import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import resultAPI from '../store/loadAction';
import planetAction from '../store/planetAction';
import store from '../store'
import './Table.css';

const headTable = () => {
  let { loadReducer: { data: { results } } } = store.getState();
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
};

const cellTable = () => {
  let { loadReducer: { data: { results } } } = store.getState();
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
};

const filterPlanet = (planet, props) => {
  const { dataPlanet, data } = props;
  dataPlanet(planet, data)
}

class Table extends Component {

  componentDidMount() {
    const { dataAPI } = this.props;
    dataAPI();
  }

  render() {
    const { onLoad, data } = this.props;
    console.log(store.getState())
    if (!onLoad) return <p>Loading...</p>;
    return (
      <div>
        <input type="text" onKeyDown={(e) => { if (e.key === 'Enter') filterPlanet(e.target.value, this.props); }}/>
        <div>StarWars DataTable with Filters</div>
        <table>
          {headTable(data)}
          {cellTable(data)}
        </table>
      </div>
    );
  }
}

const mapStateToProps = ({ loadReducer: { data, onLoad } }) => ({ data, onLoad });

const mapDispatchToProps = (dispatch) => ({
  dataAPI: () => dispatch(resultAPI()),
  dataPlanet: (planet) => dispatch(planetAction(planet)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

Table.propTypes = {
  dataAPI: PropTypes.func.isRequired,
  dataPlanet: PropTypes.func,
};
