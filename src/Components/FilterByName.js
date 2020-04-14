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
    const { filters, id } = this.props;
    const filtersSelected = [];
    for (let i = 0; i < filters.length; i += 1) {
      const { name } = filters[id + 2].numericValues;
      filtersSelected.push(name);
    }
    let arr = [
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ];
    arr = arr.filter((item) => !filtersSelected.some((selected) => item === selected));

    return (
      <div className="list" ref={this.list}>
        {arr.map((item) => (
          <Button key={item} name={item} id={id + 2} type="FilterByName" />
        ))}
      </div>
    );
  }

  render() {
    const { filters, id } = this.props;
    const { name } = filters[id + 2].numericValues;
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
});

FilterByName.propTypes = {
  filters: filtersPropTypes.filters,
  id: PropTypes.number.isRequired,
};

FilterByName.defaultProps = {
  filters: filtersDefault,
};

export default connect(mapStateToProps)(FilterByName);
