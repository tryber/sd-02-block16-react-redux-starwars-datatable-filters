import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchSWPlanets } from '../actions';
import './Table.css';

function renderplanets(param, loading) {
  if (!loading && param) {
    console.log(Object.keys(param));
    return (
      <table>
        <thead>
          <tr>
            {Object.keys(param[0]).map((item) => (item !== 'residents' ? <th className="tableHeader" key={item}>{item}</th> : null))}
          </tr>
        </thead>
        {param.map((values) => (
          <tbody key={values.name}>
            <tr>
              {Object.values(values)
                .map((body, index) => (index !== 9 ? <td className="tableData" key={body}>{body}</td> : null))}
            </tr>
          </tbody>
        ))}
      </table>
    );
  }
  return <div>Loading...</div>;
}

class Table extends React.Component {
  componentDidMount() {
    const { propriedadeQueNaoInterfere } = this.props;
    propriedadeQueNaoInterfere();
  }

  render() {
    const { isfetching, data } = this.props;
    return (
      <div>
        <h1>StarWars Datatable with Filters</h1>
        {renderplanets(data, isfetching)}
      </div>
    );
  }
}

const mapStateToProps = ({
  planetReducer: {
    isfetching,
    data,
  },
}) => ({ isfetching, data });

const mapDispatchToProps = (dispatch) => ({
  propriedadeQueNaoInterfere: () => dispatch(fetchSWPlanets()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
