import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchSWPlanets } from '../actions';

function renderplanets(param, loading) {
  if (!loading && param) {
    return <div>{param[0].name}</div>;
  }
  return <div>Loading...</div>;
}

class Table extends React.Component {
  componentDidMount() {
    const { propriedadeQueNaoInterfere } = this.props;
    propriedadeQueNaoInterfere();
  }

  render() {
    const { isfetching, planets } = this.props;
    return (
      <div>
        <h1>StarWars Datatable with Filters</h1>
        {renderplanets(planets, isfetching)}
      </div>
    );
  }
}

const mapStateToProps = ({
  planetReducer: {
    isfetching,
    planets,
  },
}) => ({ isfetching, planets });

const mapDispatchToProps = (dispatch) => ({
  propriedadeQueNaoInterfere: () => dispatch(fetchSWPlanets()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
