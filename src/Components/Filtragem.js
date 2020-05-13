import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  filtersPropTypes, filtersDefault,
} from './PropTypes';
import Filter from './Filter';


function addAction(filters, tag) {
  const newfilter = {
    numericValues: {
      name: tag,
      condition: 'maior',
      input: '',
    },
  };
  filters.push(newfilter);
  return {
    type: 'add',
    filters,
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

  componentDidUpdate() {
    const { filters } = this.props;
    if (filters[filters.length - 1].numericValues) {
      const { numericValues: { name, condition, input } } = filters[filters.length - 1];
      this.condicao(name, condition, input);
    }
  }

  condicao(name, condition, input) {
    if (name && condition && input) {
      this.addFilter();
    }
  }

  filters() {
    const { filters } = this.props;
    const coisa = [...filters];
    coisa.shift();
    coisa.shift();

    return (
      <div>
        {coisa.map((item, index) => (
          <Filter key={item.numericValues.name} id={index + 2} />
        ))}
      </div>
    );
  }

  addFilter() {
    const { dispatch, tags, filters } = this.props;
    if (tags.length > 0) {
      const tag = tags.pop();
      dispatch(addAction(filters, tag));
      dispatch(tagAction(tags));
    }
  }

  render() {
    return (
      <div className="comp_fitragem" ref={this.ref}>
        {this.filters()}
        <button type="button" onClick={() => this.addFilter()}>Adicionar filtro</button>
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
