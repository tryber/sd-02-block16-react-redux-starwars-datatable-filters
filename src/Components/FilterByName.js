import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  filtersPropTypes, filtersDefault,
} from './PropTypes';
import Button from './Button';
import './filterBy.css';

class FilterByName extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.list = React.createRef();
    this.dropdown = false;
  }

  componentDidMount() {
    this.drop();
    this.ref.current.addEventListener('click', () => {
      this.drop();
    });
    this.list.current.addEventListener('click', () => {
      this.drop();
    });
  }

  drop() {
    this.dropdown = !this.dropdown;
    if (this.dropdown) {
      this.list.current.style.display = 'none';
    } else {
      this.list.current.style.display = 'flex';
    }
  }

  renderList() {
    const { id, tags } = this.props;
    return (
      <div className="list" ref={this.list}>
        {tags.map((item) => (
          <Button
            key={item}
            name={item}
            id={id}
            type="FilterByName"
          />
        ))}
      </div>
    );
  }

  render() {
    const { filters, id } = this.props;
    const { name } = filters[id].numericValues;
    return (
      <div className="comp_filter">
        <div className="container">
          <i className="material-icons" ref={this.ref}>
            filter_list
          </i>
          <p>{name}</p>
        </div>
        {this.renderList()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  filters: state.filter.filters,
  tags: state.filterByName.tags,
});

FilterByName.propTypes = {
  filters: filtersPropTypes.filters,
  id: PropTypes.number.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

FilterByName.defaultProps = {
  filters: filtersDefault,
};

export default connect(mapStateToProps)(FilterByName);
