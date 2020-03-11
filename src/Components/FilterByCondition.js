import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './filterByName.css';

function handleClick(e) {
  return {
    type: 'FilterByCondition',
    filter: e.target.name,
  };
}

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
    const { handle } = this.props;
    return (
      <div className="comp_filter">
        <i className="material-icons" ref={this.ref}>
          last_page
        </i>
        <div className="list" ref={this.ref2}>
          <button type="button" name="all" onClick={(e) => handle(e)}>all</button>
          <button type="button" name="maior" onClick={(e) => handle(e)}>Maior que</button>
          <button type="button" name="menor" onClick={(e) => handle(e)}>Menor que</button>
          <button type="button" name="igual" onClick={(e) => handle(e)}>Igual a</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  handle: (e) => dispatch(handleClick(e)),
});

FilterByCondition.propTypes = {
  handle: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterByCondition);
