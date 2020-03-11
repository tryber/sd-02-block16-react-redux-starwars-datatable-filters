import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchSWplanets from '../store/actions';
import Cedula from './Cedula';

function compareValue(array, param) {
  const { value } = array[2].numericValues;
  if (array[2].numericValues.comparison === 'Menor que') {
    return param.filter((ele) => Number(ele[array[2].numericValues.column]) < Number(value));
  } if (array[2].numericValues.comparison === 'Maior que') {
    return param.filter((ele) => Number(ele[array[2].numericValues.column]) > Number(value));
  } if (array[2].numericValues.comparison === 'Igual a') {
    return param.filter((ele) => (Number(ele[array[2].numericValues.column]) === Number(value)));
  } return param;
}

class Table extends React.Component {
  componentDidMount() {
    const { getPlanets } = this.props;
    getPlanets();
  }

  render() {
    const { data, filters, error } = this.props;
    let filtredResult = data;
    if (filters[0].name) {
      filtredResult = data.filter((ele) => ele.name.match(new RegExp(filters[0].name, 'i')));
    }
    if (filters[2]) {
      filtredResult = compareValue(filters, filtredResult);
    }
    return (
      <table border="1px">
        <caption>STAR WARS PLANETS</caption>
        <thead>
          {(error) ? <h1>{error}</h1>
            : (
              <tr>
                {(data[0])
                  ? Object.keys(data[0]).map((ele) => {
                    if (ele !== 'residents') return (<td key={ele}>{ele}</td>);
                    return null;
                  })
                  : null}
              </tr>
            )}
        </thead>
        <tbody>
          {filtredResult.map((planet) => <tr key={planet.name}><Cedula planet={planet} /></tr>)}
        </tbody>
      </table>
    );
  }
}
const mapStateToProps = ({ data, filters, error }) => ({ data, filters, error });

const mapDispatchToProps = (dispatch) => ({
  getPlanets: () => dispatch(fetchSWplanets()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Table);

Table.propTypes = {
  results: PropTypes.instanceOf(Array),
  getPlanets: PropTypes.func,
}.isRequired;
