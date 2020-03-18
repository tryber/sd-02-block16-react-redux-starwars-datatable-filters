import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { thunkPlanets } from '../actions';
import './Table.css';

function renderPlanets(fetch, planets, fail) {
  if (!fetch && planets) {
    return (
      <table>
        <thead>
          <tr>
            {Object.keys(planets[0])
              .map((attribute) => (attribute !== 'residents'
                ? <th className="tableHeader" key={attribute}>{attribute}</th>
                : null))}
          </tr>
        </thead>
        {planets.map((values) => (
          <tbody key={values.name}>
            <tr>
              {Object.values(values)
                .map((body, index) => (index !== 9
                  ? <td className="tableData" key={body}>{body}</td>
                  : null))}
            </tr>
          </tbody>
        ))}
      </table>
    );
  }
  if (!fetch && fail) {
    return (<p>Error! API failed!</p>);
  }
  return (<p>Loading...</p>);
}

class Table extends React.Component {
  componentDidMount() {
    const { importedThunk } = this.props;
    console.log(importedThunk());
  }

  render() {
    const { fetching, data, error } = this.props;
    return (
      <div className="tableComponent">
        <h1>StarWars Datatable with Filters</h1>
        {renderPlanets(fetching, data, error)}
      </div>
    );
  }
}

const mapStateToProps = ({
  showPlanetsReducer: {
    fetching,
    data,
    error,
  },
}) => ({ fetching, data, error });

const mapDispatchToProps = (dispatch) => ({
  importedThunk: () => dispatch(thunkPlanets()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

Table.propTypes = {
  importedThunk: propTypes.func.isRequired,
  fetching: propTypes.bool.isRequired,
  data: propTypes.arrayOf(propTypes.object),
  error: propTypes.string,
};

Table.defaultProps = {
  data: null,
<<<<<<< HEAD
  error: null,
};
=======
  filtered: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
>>>>>>> 4d2e26a738f498c86889b29dde70af2325023ab8
