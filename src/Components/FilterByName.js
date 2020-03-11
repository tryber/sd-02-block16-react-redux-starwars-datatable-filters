import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './filterByName.css';

function handleClick(e) {
  return {
    type: 'FilterByName',
    filter: e.target.name,
  };
}

class FilterByName extends Component {
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
    const { handle } = this.props;
    return (
      <div className="comp_filter">
        <i className="material-icons" ref={this.ref}>
          filter_list
        </i>
        <div className="list" ref={this.ref2}>
          <button type="button" name="all" onClick={(e) => handle(e)}>all</button>
          <button type="button" name="population" onClick={(e) => handle(e)}>population</button>
          <button type="button" name="orbital_period" onClick={(e) => handle(e)}>orbital period</button>
          <button type="button" name="diameter" onClick={(e) => handle(e)}>diameter</button>
          <button type="button" name="rotation_period" onClick={(e) => handle(e)}>rotation period</button>
          <button type="button" name="surface_water" onClick={(e) => handle(e)}>surface water</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  handle: (e) => dispatch(handleClick(e)),
});

FilterByName.propTypes = {
  handle: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterByName);
