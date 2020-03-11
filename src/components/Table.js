import React from 'react';
import { connect } from 'react-redux';
import { fetchSWAPI } from '../actions';

class Table extends React.Component {
  componentDidMount() {
    const { infoAPI } = this.props;
    infoAPI();
  }

  render() {
    const { loading, name,
      rotation_period,
      orbital_period,
      diameter,
      climate,
      gravity,
      terrain,
      surface_water,
      population,
      films,
      created,
      edited,
      url, } = this.props;
      console.log(name);
    return (
      <div>
        <h1>StarWars Datatable with Filters</h1>
        <p>
          {loading && 'Loading...'}
          {name}
        </p>
      </div>

    );
  }
}


const mapStateToProps = ({ planetInfo: { loading, planet, size } }) => ({ loading, planet, size });

const mapDispatchToProps = (dispatch) => ({
  infoAPI: () => dispatch(fetchSWAPI()),
});

//  escrever argumento dentro de dispatch
// getAllData vira propriedade, e pode ser chamada com {this.props.getAllData}

export default connect(mapStateToProps, mapDispatchToProps)(Table);
