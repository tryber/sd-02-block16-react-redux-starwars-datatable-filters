import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './filterBy.css';

function handleClick(e, id, filters) {
  const coisa = filters;
  coisa[id].numericValues.condition = e.target.name;
  return {
    type: 'FilterByCondition',
    id,
    filters: coisa,
  };
}

class FilterByCondition extends Component {
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
    const { condition } = filters[this.id].numericValues;
    return (
      <div className="comp_filter">
        <div className="container">
          <i className="material-icons" ref={this.ref}>
            last_page
          </i>
          <p>{condition}</p>
        </div>
        <div className="list" ref={this.ref2}>
          <button type="button" name="all" onClick={(e) => handle(e, this.id, filters)}>All</button>
          <button type="button" name="maior" onClick={(e) => handle(e, this.id, filters)}>Maior que</button>
          <button type="button" name="menor" onClick={(e) => handle(e, this.id, filters)}>Menor que</button>
          <button type="button" name="igual" onClick={(e) => handle(e, this.id, filters)}>Igual a</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  filters: state.filter.filters,
});

const mapDispatchToProps = (dispatch) => ({
  handle: (e, id, filters) => dispatch(handleClick(e, id, filters)),
});

FilterByCondition.propTypes = {
  handle: PropTypes.func.isRequired,
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      numericValues: PropTypes.shape({
        name: PropTypes.string,
        condition: PropTypes.string,
        input: PropTypes.number,
      }).isRequired,
    }).isRequired,
  ),
  id: PropTypes.number.isRequired,
};

FilterByCondition.defaultProps = {
  filters: [
    {
      numericValues: {
        name: '',
        condition: '',
        input: undefined,
      },
    },
  ],
};


export default connect(mapStateToProps, mapDispatchToProps)(FilterByCondition);
