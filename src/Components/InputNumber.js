import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './input.css';

function handleChange(e, id, filters) {
  const coisa = filters;
  coisa[id].numericValues.input = e.target.value;
  return {
    type: 'InputNumber',
    filters: coisa,
  };
}

class InputNumber extends Component {
  constructor(props) {
    super(props);
    this.id = props.id;
  }

  render() {
    const { filters, handle } = this.props;
    const { input } = filters[this.id].numericValues;
    return (
      <div className="comp_input">
        <p>Quantidade: </p>
        <input
          type="text"
          value={input}
          onChange={(e) => handle(e, this.id, filters)}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  filters: state.filter.filters,
});

const mapDispatchToProps = (dispatch) => ({
  handle: (e, id, filters) => dispatch(handleChange(e, id, filters)),
});

InputNumber.propTypes = {
  handle: PropTypes.func.isRequired,
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      numericValues: PropTypes.shape({
        name: PropTypes.string,
        condition: PropTypes.string,
        input: PropTypes.string,
      }).isRequired,
    }).isRequired,
  ),
  id: PropTypes.number.isRequired,
};

InputNumber.defaultProps = {
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

export default connect(mapStateToProps, mapDispatchToProps)(InputNumber);
