import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class NumberFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      column: '',
      comparison: '',
      value: '',
    };
    this.selectAndInput = this.selectAndInput.bind(this);
    this.select = this.select.bind(this);
  }

  select(arrayFilter) {
    const { column } = this.state;
    return (
      <select value={column} onChange={({ target: { value } }) => this.setState({ column: value })}>
        <option>{null}</option>
        {arrayFilter.map((ele) => <option key={ele} value={ele}>{ele}</option>)}
      </select>
    );
  }

  selectAndInput() {
    const { column, comparison, value: values } = this.state;
    return (
      <div>
        <select
          value={comparison}
          disabled={(column) ? false : !false}
          onChange={({ target: { value } }) => this.setState({ comparison: value })}
        >
          <option>{null}</option>
          <option value="Maior que">Maior que</option>
          <option value="Menor que">Menor que</option>
          <option value="Igual a">Igual a</option>
        </select>
        <input
          value={values}
          disabled={(comparison) ? false : !false}
          onChange={({ target: { value } }) => this.setState({ value })}
          type="number"
        />
      </div>
    );
  }

  render() {
    const { filtred, filters, arrayFilter } = this.props;
    const { comparison, column } = this.state;
    return (
      <div>
        {this.select(arrayFilter)}
        {this.selectAndInput()}
        <button
          onClick={() => {
            filtred(this.state, arrayFilter.filter((ele) => ele !== column));
            this.setState({ column: '', comparison: '', value: '' });
          }}
          type="button"
          disabled={(comparison) ? false : !false}
        >
          Filter
        </button>
        {(filters[0].numericValues.column) ? filters.map(({ numericValues }) => (
          <div key={numericValues.column}>
            <p>{`${numericValues.column} ${numericValues.comparison} ${numericValues.value}`}</p>
            <button type="button">Exclude</button>
          </div>
        )) : null}
      </div>
    );
  }
}

const mapStateToProps = ({ filter: { planets, filters, arrayFilter } }) => (
  { planets, filters, arrayFilter });

const mapDispatchToProps = (dispatch) => ({
  filtred: (obj, arrayFilter) => dispatch({ type: 'FilterNumber', obj, arrayFilter }),
});

export default connect(mapStateToProps, mapDispatchToProps)(NumberFilter);

NumberFilter.propTypes = {
  filtredName: PropTypes.func,
}.isRequired;
