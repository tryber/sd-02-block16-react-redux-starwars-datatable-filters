import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchSWPlanets } from '../actions';

class Table extends React.Component {
  componentDidMount() {
    const { propriedadeQueNaoInterfere } = this.props;
    propriedadeQueNaoInterfere();
  }

  renderplanets(param) {
    if (!param) {
      return <div>Loading...</div>
    } else {
      return <div>{param[0].name}</div>
    }
  }

  render() {
    const { isfetching, planets } = this.props;
    return (
      <div>
        <h1>StarWars Datatable with Filters</h1>
        {this.renderplanets(planets)}
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
