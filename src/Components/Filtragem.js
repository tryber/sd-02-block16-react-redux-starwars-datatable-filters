import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Filter from './Filter';

function handleClick() {
  return {
    type: 'btnAdd',
    value: new Date(),
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
        {filters.map((id) => (
          <Filter key={id} />
        ))}
      </div>
    );
  }

  render() {
    const { handle } = this.props;
    return (
      <div className="comp_fitragem" ref={this.ref}>
        {this.filters()}
        <button type="button" onClick={() => handle()}>Adicionar filtro</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  filters: state.button.filters_comp,
});

const mapDispatchToProps = (dispatch) => ({
  handle: () => dispatch(handleClick()),
});

Filtragem.propTypes = {
  handle: PropTypes.func.isRequired,
  filters: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filtragem);
