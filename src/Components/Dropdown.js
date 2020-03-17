import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Dropdown.css';


function actionName(e, order) {
  return {
    type: 'Order',
    order: {
      ...order,
      name: e.target.outerText,
    },
  };
}

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.dropdown = false;
    this.list = React.createRef();
    this.selected = React.createRef();
  }

  clickHandle(e) {
    const { order, dispatch } = this.props;
    this.selected.current.innerText = e.target.outerText;
    this.dropDonw();
    dispatch(actionName(e, order));
  }

  dropDonw() {
    this.dropdown = !this.dropdown;
    if (this.dropdown) {
      this.list.current.style.display = 'none';
    } else {
      this.list.current.style.display = 'flex';
    }
  }

  renderBtn() {
    return (
      <button
        type="button"
        onClick={() => this.dropDonw()}
        ref={this.btn}
      >
        <i className="material-icons">
          keyboard_arrow_down
        </i>
        <p ref={this.selected} />
      </button>
    );
  }

  render() {
    const { options } = this.props;
    return (
      <div className="comp_dropdown">
        <div className="selected">
          {this.renderBtn()}
        </div>
        <div className="list" ref={this.list}>
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={(e) => this.clickHandle(e)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

Dropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
  order: PropTypes.shape({
    name: PropTypes.string,
    asc: PropTypes.string,
  }),
  dispatch: PropTypes.func.isRequired,
};

Dropdown.defaultProps = {
  order: {
    name: '',
    asc: '',
  },
};

const mapStateToProps = (state) => ({
  order: state.filter.order,
  planets: state.data.planets,
});


export default connect(mapStateToProps)(Dropdown);
