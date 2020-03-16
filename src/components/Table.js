import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchSWPlanets, filterSWPlanets } from '../actions';
import Select from './Select';
import './Table.css';

function renderplanets(param, loading, filt) {
  if (!loading && param) {
    return (
      <table>
        <thead>
          <tr>
            {Object.keys(param[0]).map((item) => (item !== 'residents' ? <th className="tableHeader" key={item}>{item}</th> : null))}
          </tr>
        </thead>
        {!filt ? param.map((values) => (
          <tbody key={values.name}>
            <tr>
              {Object.values(values)
                .map((body, index) => (index !== 9 ? <td className="tableData" key={body}>{body}</td>
                  : null))}
            </tr>
          </tbody>
        )) : filt.map((values) => (
          <tbody key={values.name}>
            <tr>
              {Object.values(values)
                .map((body, index) => (index !== 9 ? <td className="tableData" key={body}>{body}</td>
                  : null))}
            </tr>
          </tbody>
        ))}
      </table>
    );
  }
  return <div>Loading...</div>;
}

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  componentDidMount() {
    const { propriedadeQueNaoInterfere } = this.props;
    propriedadeQueNaoInterfere();
  }

  onChangeHandler(event) {
    const { filterPlanetsByText } = this.props;
    let { data } = this.props;
    const text = event.target.value.toLowerCase();
    filterPlanetsByText(text, data);
    data = filterPlanetsByText(text, data).results;
  }

  render() {
    const { isfetching, data, filtered } = this.props;
    return (
      <div>
        <h1>StarWars Datatable with Filters</h1>
        <input placeholder="filter planets!" onChange={this.onChangeHandler} />
        <Select />
        {renderplanets(data, isfetching, filtered)}
      </div>
    );
  }
}

const mapStateToProps = ({
  planetReducer: {
    isfetching,
    data,
  },
  wordReducer: {
    filtered,
  },
}) => ({ isfetching, data, filtered });

const mapDispatchToProps = (dispatch) => ({
  propriedadeQueNaoInterfere: () => dispatch(fetchSWPlanets()),
  filterPlanetsByText: (typing, data) => dispatch(filterSWPlanets(typing, data)),
});

Table.propTypes = {
  propriedadeQueNaoInterfere: propTypes.func.isRequired,
  filterPlanetsByText: propTypes.func.isRequired,
  isfetching: propTypes.bool.isRequired,
  data: propTypes.string,
  filtered: propTypes.string,
};

Table.defaultProps = {
  data: null,
  filtered: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
