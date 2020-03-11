import React, { Component } from 'react';

import FilterByName from './FilterByName';
import FilterByCondition from './FilterByCondition';
import InputNumber from './InputNumber';
import InputName from './InputName';

export default class Filter extends Component {
  render() {
    return (
      <div>
        <InputName />
        <FilterByName />
        <FilterByCondition />
        <InputNumber />
      </div>
    );
  }
}
