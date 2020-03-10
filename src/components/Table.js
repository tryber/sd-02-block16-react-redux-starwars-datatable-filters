import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchSWplanets from '../store/actions';
import Cedula from './Cedula';

class Table extends React.Component {
  componentDidMount() {
    const { getPlanets } = this.props;
    getPlanets();

  }

  render() {
    const { data, filters } = this.props;
    let filtredResult = data;
    if (filters) {
      filtredResult = data.filter((ele) => ele.name.match(new RegExp(filters[0].name, 'i')));
    }
    return (
      <table border="1px">
        <caption>STAR WARS PLANETS</caption>
        <thead>
          <tr>
            {(data[0])
              ? Object.keys(data[0]).map((ele) => {
                if (ele !== 'residents') return (<td key={ele}>{ele}</td>);
                return null;
              })
              : null}
          </tr>
        </thead>
        <tbody>
          {filtredResult.map((planet) => <tr key={planet.name}><Cedula planet={planet} /></tr>)}
        </tbody>
      </table>
    );
  }
}
const mapStateToProps = ({ data, filters }) => ({ data, filters });

const mapDispatchToProps = (dispatch) => ({
  getPlanets: () => dispatch(fetchSWplanets()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Table);

Table.propTypes = {
  results: PropTypes.instanceOf(Array),
  getPlanets: PropTypes.func,
}.isRequired;
