import React, { Component } from 'react';

import FilterByName from './FilterByName';
import FilterByCondition from './FilterByCondition';
import InputNumber from './InputNumber';

export default class Filter extends Component {
  render() {
    return (
      <div className="comp_filter_cont">
        <FilterByName />
        <FilterByCondition />
        <InputNumber />
      </div>
    );
  }
}
