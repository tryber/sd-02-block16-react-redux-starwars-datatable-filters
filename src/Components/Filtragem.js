import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  filtersPropTypes, filtersDefault,
} from './PropTypes';
import Filter from './Filter';

function handleClick(filters) {
  const filter = {
    numericValues: {
      name: 'population',
      condition: 'maior',
      input: 2000,
    },
  };
  const coisa = filters;
  coisa.push(filter);
  return {
    type: 'add',
    filters: coisa,
  };
}

class Filtragem extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  filters() {
    const { filters } = this.props;
    return (
      <div>
        {filters.map((item, index) => (
          <Filter key={Math.random()} id={index} />
        ))}
      </div>
    );
  }

  render() {
    const { handle, filters } = this.props;
    return (
      <div className="comp_fitragem" ref={this.ref}>
        {this.filters()}
        <button type="button" onClick={() => handle(filters)}>Adicionar filtro</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  filters: state.filter.filters,
});

const mapDispatchToProps = (dispatch) => ({
  handle: (filters) => dispatch(handleClick(filters)),
});

Filtragem.propTypes = {
  handle: PropTypes.func.isRequired,
  filters: filtersPropTypes,
};

Filtragem.defaultProps = {
  filters: filtersDefault,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filtragem);
