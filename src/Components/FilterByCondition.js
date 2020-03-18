import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  filtersPropTypes, filtersDefault,
} from './PropTypes';
import Button from './Button';
import './filterBy.css';

class FilterByCondition extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.ref2 = React.createRef();
    this.dropdown = false;
  }

  componentDidMount() {
    this.dropDown();
    this.ref.current.addEventListener('click', () => {
      this.dropDown();
    });
  }

  dropDown() {
    this.dropdown = !this.dropdown;
    if (this.dropdown) {
      this.ref2.current.style.display = 'none';
    } else {
      this.ref2.current.style.display = 'flex';
    }
  }

  render() {
    const { filters, id } = this.props;
    const { condition } = filters[id].numericValues;
    return (
      <div className="comp_filter">
        <div className="container">
          <i className="material-icons" ref={this.ref}>
            last_page
          </i>
          <p>{condition}</p>
        </div>
        <div className="list" ref={this.ref2}>
          <Button name="all" btn="all" id={id} type="FilterByCondition" />
          <Button name="maior" btn="Maior que" id={id} type="FilterByCondition" />
          <Button name="menor" btn="Menor que" id={id} type="FilterByCondition" />
          <Button name="igual" btn="Igual a" id={id} type="FilterByCondition" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  filters: state.filter.filters,
});


FilterByCondition.propTypes = {
  filters: filtersPropTypes.filters,
  id: PropTypes.number.isRequired,
};

FilterByCondition.defaultProps = {
  filters: filtersDefault,
};


export default connect(mapStateToProps)(FilterByCondition);
