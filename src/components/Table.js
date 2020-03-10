import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchPlanets } from '../actions';

class Table extends Component {
  componentDidMount() {
    const { getPlanets } = this.props;
    getPlanets();
    console.log(this.props);
  }

  render() {
    const { planets } = this.props.planets;
    console.log(planets);
    return (
      <div className="map">
        A tabela virá aqui
      </div>
    );
  }
}

const mapStateToProps = ({ planets }) => (
  {
    planets,
  }
);

const mapDispatchToProps = (dispatch) => ({
  getPlanets: () => dispatch(fetchPlanets()),
});

Table.propTypes = {
  getPlanets: PropTypes.func,
};

Table.defaultProps = {
  getPlanets: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
