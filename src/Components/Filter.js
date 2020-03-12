import React, { Component } from 'react';

import FilterByName from './FilterByName';
import FilterByCondition from './FilterByCondition';
import InputNumber from './InputNumber';

export default class Filter extends Component {
  render() {
    const { id } = this.props;
    return (
      <div className="comp_filter_cont" name={id}>
        <FilterByName id={id} />
        <FilterByCondition id={id} />
        <InputNumber id={id} />
      </div>
    );
  }
}
