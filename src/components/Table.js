import React, { Component } from 'react';
import { connect } from 'react-redux';
import getPlanets from '../services/starwarsAPI';
import addPlanets from '../store/actions/addPlanets';

class Table extends Component {
  componentDidMount() {
    const { createPlanets } = this.props;
    getPlanets()
      .then(({ results }) => createPlanets(results));
  }

  render() {
    const { data, wasFetched } = this.props;
    console.log(data[0]);
    return (
      <div>
        <h1>StarWars Datatable with Filters:</h1>
        <table border="1px">
          <tr>
            {wasFetched && Object.keys(data[0]).map((key, index) => <th key={index}>{key}</th>)}
          </tr>
          {wasFetched && data.map((planet, index) => (
            <tr key={index}>
              {Object.values(planet).map((value) => <td key={value}>{value}</td>)}
            </tr>
          ))}

        </table>

      </div>

    );
  }
}


const mapDispatchToProps = (dispatch) => ({
  createPlanets: (results) => dispatch(addPlanets(results)),
});

const mapStateToProps = ({ reducerStar: { data, wasFetched } }) => ({
  data, wasFetched,
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
