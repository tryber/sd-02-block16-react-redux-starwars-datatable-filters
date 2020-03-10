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
    const { data } = this.props;
    console.log(data)
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
          {data.map((planet) => <tr key={planet.name}><Cedula planet={planet} /></tr>)}
        </tbody>
      </table>
    );
  }
}
const mapStateToProps = ({
  data: results,
}) => ({
  data: results,
});

const mapDispatchToProps = (dispatch) => ({
  getPlanets: () => dispatch(fetchSWplanets()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Table);

Table.propTypes = {
  results: PropTypes.instanceOf(Array),
  getPlanets: PropTypes.func,
}.isRequired;
