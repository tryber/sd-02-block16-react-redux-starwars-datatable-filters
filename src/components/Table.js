import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { thunkPlanets } from '../actions';
import { filterText } from '../actions/textActions';
import './Table.css';

function generateBody(param) {
  return (
    param.map((values) => (
      <tbody key={values.name}>
        <tr>
          {Object.values(values)
            .map((body, index) => (index !== 9
              ? <td className="tableData" key={body}>{body}</td>
              : null))}
        </tr>
      </tbody>
    ))
  );
}

function generateTable(fetch, planets, fail) {
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
        {generateBody(planets)}
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
    console.log('***table.componentDidMount', importedThunk());
  }

  render() {
    const { fetching, data, error, name, importedTextReducer } = this.props;
    return (
      <div className="tableComponent">
        <h1>StarWars Datatable with Filters</h1>
        <input value={name} onChange={(e) => importedTextReducer(e.target.value)} />
        <p>{name}</p>
        {generateTable(fetching, data, error, name)}
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
  filterTextReducer: {
    name,
  },
}) => ({
  fetching, data, error, name,
});

const mapDispatchToProps = (dispatch) => ({
  importedThunk: () => dispatch(thunkPlanets()),
  importedTextReducer: (typing) => dispatch(filterText(typing)),
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
  error: null,
};
