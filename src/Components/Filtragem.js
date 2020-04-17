import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  filtersPropTypes, filtersDefault,
} from './PropTypes';
import Filter from './Filter';


function handleClick(filters, tag) {
  const newfilter = {
    numericValues: {
      name: tag,
      condition: 'maior',
      input: undefined,
    },
  };
  const coisa = filters;
  coisa.push(newfilter);
  return {
    type: 'add',
    filters: coisa,
  };
}

function tagAction(tags) {
  return {
    type: 'tag',
    tags,
  };
}

class Filtragem extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  filters() {
    const { filters } = this.props;
    const coisa = [...filters];
    coisa.shift();
    coisa.shift();

    return (
      <div>
        {coisa.map((item, index) => (
          <Filter key={item.numericValues.name} id={index} />
        ))}
      </div>
    );
  }

  handle(filters) {
    const { dispatch, tags } = this.props;
    const tag = tags.pop();
    dispatch(handleClick(filters, tag));
    dispatch(tagAction(tags));
  }

  render() {
    const { filters } = this.props;
    return (
      <div className="comp_fitragem" ref={this.ref}>
        {this.filters()}
        <button type="button" onClick={() => this.handle(filters)}>Adicionar filtro</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  filters: state.filter.filters,
  tags: state.filterByName.tags,
});

Filtragem.propTypes = {
  filters: filtersPropTypes.filters,
  dispatch: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Filtragem.defaultProps = {
  filters: filtersDefault,
};

export default connect(mapStateToProps)(Filtragem);
