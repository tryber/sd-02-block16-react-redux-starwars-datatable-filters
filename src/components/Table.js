import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchSWplanets from '../store/actions';
import Cedula from './Cedula';

function compareValue(array, param, filters) {
  const { value } = array.numericValues;
  if (array.numericValues.comparison === 'Menor que') {
    return param.filter((ele) => (Number(ele[array.numericValues.column]) < Number(value) && ele.name.match(new RegExp(filters[0].name, 'i'))));
  } if (array.numericValues.comparison === 'Maior que') {
    return param.filter((ele) => Number(ele[array.numericValues.column]) > Number(value) && ele.name.match(new RegExp(filters[0].name, 'i')));
  } if (array.numericValues.comparison === 'Igual a') {
    return param.filter((ele) => (Number(ele[array.numericValues.column]) === Number(value) && ele.name.match(new RegExp(filters[0].name, 'i'))));
  } return param;
}

class Table extends React.Component {
  componentDidMount() {
    const { getPlanets } = this.props;
    getPlanets();
  }

  render() {
    const { api: { data, filters }, filter: { filters: results } } = this.props;
    let filtredResult = data;
    if (results[0]) {
      results.forEach((ele) => { filtredResult = compareValue(ele, filtredResult, filters) });
    } if (filters[0].name) {
      filtredResult = filtredResult.filter((ele) => ele.name.match(new RegExp(filters[0].name, 'i')));
    }
    return (
      <table border="1px">
        <caption>STAR WARS PLANETS</caption>
        <thead>
          (
          <tr>
            {(data[0])
              ? Object.keys(data[0]).map((ele) => {
                if (ele !== 'residents') return (<td key={ele}>{ele}</td>);
                return null;
              })
              : null}
          </tr>
          )
        </thead>
        <tbody>
          {filtredResult.map((planet) => <tr key={planet.name}><Cedula planet={planet} /></tr>)}
        </tbody>
      </table>
    );
  }
}
const mapStateToProps = ({ api, filter }) => ({ api, filter });

const mapDispatchToProps = (dispatch) => ({
  getPlanets: () => dispatch(fetchSWplanets()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Table);

Table.propTypes = {
  results: PropTypes.instanceOf(Array),
  getPlanets: PropTypes.func,
}.isRequired;
