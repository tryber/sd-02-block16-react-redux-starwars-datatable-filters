import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './filterBy.css';

function handleClick(e, id) {
  return {
    type: 'FilterByName',
    id,
    filter: e.target.name,
  };
}

class FilterByName extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.ref2 = React.createRef();
    this.dropdown = false;
    this.id = props.id;
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
    const { filters, handle } = this.props;
    const { name: tag } = filters[this.id].numericValues;
    return (
      <div className="comp_filter">
        <div className="container">
          <i className="material-icons" ref={this.ref}>
            filter_list
          </i>
          <p>{tag}</p>
        </div>
        <div className="list" ref={this.ref2}>
          <button type="button" name="population" onClick={(e) => handle(e, this.id)}>population</button>
          <button type="button" name="orbital_period" onClick={(e) => handle(e, this.id)}>orbital period</button>
          <button type="button" name="diameter" onClick={(e) => handle(e, this.id)}>diameter</button>
          <button type="button" name="rotation_period" onClick={(e) => handle(e, this.id)}>rotation period</button>
          <button type="button" name="surface_water" onClick={(e) => handle(e, this.id)}>surface water</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  filters: state.filter.filters,
});

const mapDispatchToProps = (dispatch) => ({
  handle: (e, id) => dispatch(handleClick(e, id)),
});

FilterByName.propTypes = {
  handle: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterByName);
