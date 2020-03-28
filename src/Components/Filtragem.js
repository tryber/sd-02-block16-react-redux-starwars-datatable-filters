import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';

import {
  filtersPropTypes, filtersDefault,
} from './PropTypes';
import Filter from './Filter';

function handleClick(filters) {
  const filter = {
    numericValues: {
      name: '',
      condition: 'maior',
      input: undefined,
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
          <Filter key={uuid()} id={index} />
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
  filters: filtersPropTypes.filters,
};

Filtragem.defaultProps = {
  filters: filtersDefault,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filtragem);
